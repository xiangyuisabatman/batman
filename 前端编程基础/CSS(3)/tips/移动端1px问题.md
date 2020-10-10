1. 什么是移动端1px问题：
在移动端web开发中,UI设计稿中设置边框为1像素,前端在开发过程中如果出现border:1px会发现在高清屏中,1px会比较粗.
2. 为什么高清屏下1px更宽：
高清屏是指高dpr的设备,其物理像素的密度更大.`dpr:物理像素/css像素`,在普通屏,1个css像素对应1个物理像素;2倍屏中,一个css像素对应4个物理像素;3倍屏中则是9个.

3. 如何修复高清屏下的1px问题

    - SVG方案
    ```
    @svg custom-name {
      width: 4px;  
      height: 4px;  
       @rect {
           fill: transparent;
           width: 100%;
           height: 100%;
           stroke-width: 1;
           stroke: var(--color, black);  
        }
    }
    .svg-retina-border {
        border: 1px solid;
        border-image: svg(custom-name param(--color green)) 1 repeat;
    }
    .normal-border {
        border: 1px solid green;
    }
    ```

    - 伪类元素缩放方案

    ```
    .retina-border {
     position: relative;
    }
    .retina-border::before {
     content: '';  
     position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: left top;
        box-sizing: border-box;
        pointer-events: none;
        border-width: 1px;
        border-style: solid;
        border-color: #333;
    }
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {  .retina-border::before {
     width: 200%;
        height: 200%;
        transform: scale(0.5);
        }
    }
    @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {  .retina-border::before {  
     width: 300%;
        height: 300%;
        transform: scale(0.33);
        }
    }
    .normal-border {
     border: 1px solid #333;
    }
    ```
