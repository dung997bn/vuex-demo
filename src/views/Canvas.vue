<template>
  <canvas id="myCanvas" :width="widthZoom" :height="heightZoom"></canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Vue } from "vue-class-component";

function drawTest(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx!.fillStyle = "#23de36";
  ctx!.fillRect(x, y, width, height);
}

function drawTestCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) {
  ctx!.fillStyle = "#56a832";
  ctx!.arc(x, y, r, 0, 2 * Math.PI,true);
  ctx!.fill()
}

function getMousePos(canvas: any, evt: any) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

function isInside(pos: any, rect: any) {
  debugger;
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}

function isInsideCircle(pos: any, circle: any) {
  debugger;
  return (
    pos.x >= circle.x - circle.r &&
    pos.x <= circle.x + circle.r &&
    pos.y <= circle.y + circle.r &&
    pos.y >= circle.y - circle.r &&
    Math.sqrt((Math.pow(pos.x - circle.x, 2) + Math.pow(pos.y - circle.y, 2))) <
      circle.r
  );
}

export default defineComponent({
  name: "Canvas",
  data() {
    return {
      currentWidth: 700,
      ratio: 5 / 7,
      data: [] as Array<any>,
      dataCircle: [] as Array<any>,
    };
  },
  computed: {
    widthZoom(): number {
      return this.currentWidth;
    },
    heightZoom(): number {
      return this.currentWidth * this.ratio;
    },
  },
  async mounted() {
    await this.drawImage(this.widthZoom, this.heightZoom, 700, 500);
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const data = this.data;
    const dataCircle = this.dataCircle;
    canvas.addEventListener(
      "click",
      function (event) {
        var pos = getMousePos(canvas, event);
        drawTest(ctx!, pos.x, pos.y, 5, 5);
       //  drawTestCircle(ctx!, dataCircle[0].x, dataCircle[0].y, 10);
        // check inside reactangle
        // if (isInside(pos, data[0])) {
        //   alert("clicked inside rect");
        // } else {
        //   alert("clicked outside rect");
        // }

        // check inside circle
        if (isInsideCircle(pos, dataCircle[0])) {
          alert("clicked inside rect");
        } else {
          alert("clicked outside rect");
        }
      },
      false
    );
  },
  methods: {
    async drawImage(
      width: number,
      height: number,
      widthImage: number,
      heightImage: number
    ) {
      const c = document.getElementById("myCanvas") as HTMLCanvasElement;
      const ctx = c.getContext("2d");
      const img = new Image(widthImage, heightImage);
      img.src =
        "https://ofaas-nws-storage.oss-ap-northeast-1.aliyuncs.com/ofaas/floor/screen-1.jpg";
      img.onload = async () => {
        setTimeout(() => {
          ctx!.drawImage(img, 0, 0, width, height);
          const ratioWidth = width / widthImage;
          const ratioHeight = height / heightImage;
          // this.drawRectangle1(
          //   ctx!,
          //   widthImage,
          //   heightImage,
          //   ratioWidth,
          //   ratioHeight
          // );
          this.drawCircle(
            ctx!,
            widthImage,
            heightImage,
            ratioWidth,
            ratioHeight
          );
          // this.drawRectangle2(ctx!);
          // this.drawCircle(ctx!);
          // this.drawCircle2(ctx!);
        }, 10);
      };
    },
    drawCircle(
      ctx: CanvasRenderingContext2D,
      widthImage: number,
      heightImage: number,
      ratioWidth: number,
      ratioHeight: number
    ) {
      ctx!.fillStyle = "#d62216";
      ctx!.arc(
        ((229.25597060624614 * widthImage) / 800 + (25 * widthImage) / 800) *
          ratioWidth,
        ((100.45942927727981 * heightImage) / 600 + (25 * widthImage) / 800) *
          ratioHeight,
        25,
        0,
        2 * Math.PI
      );
      ctx.fill();

      this.dataCircle.push({
        x:
          ((229.25597060624614 * widthImage) / 800 + (25 * widthImage) / 800) *
          ratioWidth,
        y:
          ((100.45942927727981 * heightImage) / 600 + (25 * widthImage) / 800) *
          ratioHeight,
        r: 25,
      } as any);
    },
    drawRectangle1(
      ctx: CanvasRenderingContext2D,
      widthImage: number,
      heightImage: number,
      ratioWidth: number,
      ratioHeight: number
    ): any {
      ctx!.fillStyle = "#d62215";
      ctx!.fillRect(
        ((60.71647274954073 * widthImage) / 800) * ratioWidth,
        ((56.825984158397134 * heightImage) / 600) * ratioHeight,
        100.00000000000001 * ratioWidth,
        50.0 * ratioHeight
      );
      this.data.push({
        x: ((60.71647274954073 * widthImage) / 800) * ratioWidth,
        y: ((56.825984158397134 * heightImage) / 600) * ratioHeight,
        width: 100.00000000000001 * ratioWidth,
        height: 50.0 * ratioHeight,
      } as any);
    },
  },
});
</script>

<style scoped></style>
