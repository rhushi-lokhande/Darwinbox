export function Canvas_Graph(myCanvas, data) {
    const ctx = myCanvas.getContext('2d');
    if (!data || data.lenght) {
        data = [];
        ctx.fillText('please provide data to draw graph', myCanvas.height / 2, myCanvas.width / 2);
    }
    myCanvas.width = 700;
    myCanvas.height = 500;
    const padding_left = 40;
    const padding_bottom = 0;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    drawBorder(500, 700);
    drawX(500, 700);
    drawY(500, 700);

    function point(x, y) {
        ctx.save();
        ctx.strokeStyle = '#007bff';
        ctx.beginPath();
        ctx.fillRect(x - 2, y - 2, 4, 4);
        ctx.stroke();
        ctx.restore();
    }
    function draw_line(startX, startY, endX, endY, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }

    function drawX(h, w) {
        const sp = 100;
        const x = 1000 / sp;
        const scale = (h - padding_bottom) / x;
        draw_line(0, h, w, h, '000');
        for (let index = 0; index < x; index++) {
            ctx.fillText((x - index) * sp, 10, (index * scale) + 3);
            draw_line(padding_left - 5, index * scale, w, index * scale, '#000000');
        }
    }

    function drawY(h, w) {
        const scale = (w - padding_left) / data.length;
        let lastx, lasty;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            point((index * scale) + padding_left, h - (element.value / 1000) * h);
            if (index >= 1) {
                draw_line(lastx, lasty, (index * scale) + padding_left, h - (element.value / 1000) * h, '#007bff');
            }
            lastx = (index * scale) + padding_left;
            lasty = h - (element.value / 1000) * h;
        }
    }

    function drawBorder(h, w) {
        draw_line(0, 0, 0, h, '000');
        draw_line(0, 0, w, 0, '000');
        draw_line(0, h, w, h, '000');
        draw_line(w, 0, w, h, '000');
        draw_line(padding_left, 0, padding_left, h - padding_bottom + 5, '000');
        draw_line(padding_left - 5, h - padding_bottom, w, h - padding_bottom, '000');
    }

    function update(newData) {
        if (data.length === 50) {
            data.shift();
        }
        data.push(newData);
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        drawBorder(myCanvas.height, myCanvas.width);
        drawX(myCanvas.height, myCanvas.width);
        drawY(myCanvas.height, myCanvas.width);
    }
    return {
        update: function (newD) {
            update(newD);
        }
    };
}
