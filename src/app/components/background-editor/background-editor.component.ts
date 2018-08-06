import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { Player } from '../../classes/player';
import { ISceneObj } from '../../types/scene.types';
import { World } from '../../classes/world';
import { Scene } from '../../classes/scene';
import { WorldService } from '../../services/world.service';

const pixelSize = 4;

@Component({
  selector: 'app-background-editor',
  templateUrl: './background-editor.component.html',
  styleUrls: ['./background-editor.component.css']
})
export class BackgroundEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('backgroundEditorCanvas')
  canvasRef?: ElementRef;
  canvas?: HTMLCanvasElement;
  pixelSize: number = pixelSize;
  animationRequest?: number;
  mousePos: {
      x?: number;
      y?: number;
  } = {};
  brushSize: number = pixelSize * 5;
  brushColor = Player.defaults.color;
  brushScope: ISceneObj[] = [];
  paintingInterval?: number;
  world?: World;
  currentSceneId: number = 0;
  currentScene?: Scene;
  erasing: boolean = false;

  constructor(
      private worldService: WorldService
  ) { }

  async ngOnInit() {
      const loadedWorld = await this.worldService.getWorld();
      if (loadedWorld) {
          this.world = new World({
              scenes: loadedWorld.scenes
          });
      } else {
          this.world = new World();
      }
      this.currentScene = this.world.scenes.find((scene) => scene.id === this.currentSceneId);
  }

  ngAfterViewInit() {
      this.canvas = this.canvasRef && this.canvasRef.nativeElement;
      this.animationRequest = window.requestAnimationFrame(() => {
          this.drawEditor();
      });
  }

  ngOnDestroy() {
      if (this.animationRequest) {
          window.cancelAnimationFrame(this.animationRequest);
      }
      this.save();
  }

  drawEditor() {
      const canvas = this.canvas;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              this.drawObjects();
              this.drawBrush();
              window.requestAnimationFrame(() => {
                  this.drawEditor();
              });
          }
      }
  }

  drawObjects() {
      const canvas = this.canvas;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx && this.currentScene) {
              this.currentScene.objects.forEach((object) => {
                  ctx.fillStyle = object.color;
                  ctx.fillRect(
                      object.pos.x,
                      object.pos.y,
                      object.size.width,
                      object.size.height
                  );
              });
          }
      }
  }

  drawBrush() {
      const canvas = this.canvas;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx && this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
              ctx.save();
              ctx.fillStyle = this.brushColor;
              ctx.globalAlpha = 0.8;
              for (let i = this.mousePos.x - this.brushSize; i < this.mousePos.x + this.brushSize; i += this.pixelSize) {
                  for (let j = this.mousePos.y - this.brushSize; j < this.mousePos.y + this.brushSize; j += this.pixelSize) {
                      ctx.fillRect(i, j, this.pixelSize, this.pixelSize);
                  }
              }
              ctx.restore();
              ctx.strokeStyle = '#CCCCCC';
              ctx.strokeRect(
                  this.mousePos.x - this.brushSize, 
                  this.mousePos.y - this.brushSize, 
                  this.brushSize * 2,
                  this.brushSize * 2
              );
          }
      }
  }

  drawGrid() {
      const canvas = this.canvas;
      if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
              ctx.beginPath();
              for (let i = 0; i < canvas.width; i += this.pixelSize) {
                  ctx.moveTo(i, 0);
                  ctx.lineTo(i, canvas.height);
              }
              for (let j = 0; j < canvas.height; j += this.pixelSize) {
                  ctx.moveTo(0, j);
                  ctx.lineTo(canvas.width, j);
              }
              ctx.strokeStyle = 'rgb(255,255,255)';
              ctx.stroke();
          }
      }
  }

  handleMouseMove(evt: MouseEvent) {
      const canvas = this.canvas;
      if (canvas) {
          const rawMouseX = Math.floor(evt.offsetX * (canvas.width / canvas.clientWidth));
          const rawMouseY = Math.floor(evt.offsetY * (canvas.height / canvas.clientHeight));
          this.mousePos.x = Math.floor(rawMouseX / this.pixelSize) * this.pixelSize;
          this.mousePos.y = Math.floor(rawMouseY / this.pixelSize) * this.pixelSize;
          
          this.updateBrushScope();
      }
  }

  updateBrushScope() {
      const sceneObjects = this.currentScene ? this.currentScene.objects : [];
      this.brushScope = sceneObjects.filter((sceneObj) => {
          if (this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
              return (
                  Math.abs(sceneObj.pos.x - this.mousePos.x) <= this.brushSize &&
                  Math.abs(sceneObj.pos.y - this.mousePos.y) <= this.brushSize
              )
          }
      });
  }

  handleMouseDown(evt: MouseEvent) {
      if (this.currentScene) {
          const sceneObjects = this.currentScene.objects;
          this.paintingInterval = window.setInterval(() => {
              this.updateBrushScope();
              if (this.mousePos.x !== undefined && this.mousePos.y !== undefined) {
                  for (let i = this.mousePos.x - this.brushSize; i < this.mousePos.x + this.brushSize; i += this.pixelSize) {
                      for (let j = this.mousePos.y - this.brushSize; j < this.mousePos.y + this.brushSize; j += this.pixelSize) {
                          if (this.canvas && (i < 0 || j < 0 || i > this.canvas.width || j > this.canvas.height)) {
                              continue;
                          }
                          const newPixel = {
                              pos: {
                                  x: i,
                                  y: j
                              },
                              size: {
                                  width: this.pixelSize,
                                  height: this.pixelSize
                              },
                              color: this.brushColor
                          }
                          const duplicateObject = this.brushScope.find((sceneObject) => {
                              return (
                                  (sceneObject.pos.x === newPixel.pos.x) &&
                                  (sceneObject.pos.y === newPixel.pos.y)
                              );
                          });
                          if (duplicateObject) {
                              const duplicateIndex = sceneObjects.indexOf(duplicateObject);
                              if (duplicateIndex !== -1) {
                                  sceneObjects.splice(duplicateIndex, 1);
                              }
                          }
                          if (!this.erasing) {
                              sceneObjects.push(newPixel);
                          }
                      }
                  }
              }
          }, 10);
      }
  }

  handleMouseUp() {
      this.clearPaintingInterval();
  }

  handleMouseLeave() {
      this.clearPaintingInterval();
  }

  clearPaintingInterval() {
      if (this.paintingInterval) {
          window.clearInterval(this.paintingInterval);
      }
  }

  clear() {
      const confirm = window.confirm('Are you sure you want to clear this scene?');
      if (!confirm) return;
      if (this.currentScene) {
          this.currentScene.objects = [];
      }
  }

  save(evt?: MouseEvent) {
      if (this.world) {
          this.worldService.saveWorld(this.world).then(() => {
              if (evt) {
                  alert('Saved!');
              }
          });
      }
  }

}
