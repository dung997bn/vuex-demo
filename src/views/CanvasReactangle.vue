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
function getMousePos(canvas: any, evt: any) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}
function isInside(pos: any, rect: any) {
    debugger
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}
export default defineComponent({
  name: "CanvasReactangle",
  data() {
    return {
      currentWidth: 700,
      ratio: 5 / 7,
      data: [] as Array<any>,
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
    canvas.addEventListener(
      "click",
      function (event) {
        console.log(event);
        var pos = getMousePos(canvas, event);
        drawTest(ctx!, pos.x, pos.y, 5, 5);
        //var rect = canvas.getBoundingClientRect();
        // drawTest(ctx!, rect.x, rect.y, rect.width, rect.height);
        console.log(data);
        if (isInside(pos, data[0])) {
          alert("clicked inside rect");
        } else {
          alert("clicked outside rect");
        }
        console.log(pos);
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
          this.drawRectangle1(
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