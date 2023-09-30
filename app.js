let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d', { willReadFrequently: true });


let img = new Image();
let originalImageData = null;



document.getElementById('imageLoader').addEventListener('change', handleImage, false);
document.getElementById('divide4').addEventListener('click', function() {
    divideImage(4);
}, false);

document.getElementById('divide8').addEventListener('click', function() {
    divideImage(8);
}, false);

document.getElementById('divide16').addEventListener('click', function() {
    divideImage(16);
}, false);
document.getElementById('imageLoader').style.marginTop = '110px';  // Ajuste o valor conforme necessário
imageLoader.style.border = '1px solid black';  // Adiciona um contorno preto

function handleImage(e) {
    let reader = new FileReader();
    reader.onload = function(event){
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar o canvas
            ctx.drawImage(img,0,0);
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            document.getElementById('controls').style.display = 'block';
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function clearCanvas() {
    // Restaurando o tamanho original do canvas
    canvas.width = originalImageData.width;
    canvas.height = originalImageData.height;

    // Limpar e restaurar os dados da imagem original
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(originalImageData, 0, 0);

    // Remove os links de download
    let downloadLinksDiv = document.getElementById('downloadLinks');
    if (downloadLinksDiv) {
        downloadLinksDiv.innerHTML = '';  // limpa o conteúdo do div
    }

    // Limpar a legenda de cores
    let legendDiv = document.getElementById("colorLegend");
    if (legendDiv) {
        legendDiv.innerHTML = '';
        legendDiv.style.display = 'none';  // ou outra forma de ocultar
    }

    // Refazer a numeração aqui, se necessário
}

document.getElementById('clearButton').addEventListener('click', clearCanvas);

document.getElementById('grid10').addEventListener('click', function() {
    lastGridType = 'grid10';
    drawGrid(70, 50, grid10Color);
});


let grid5Color = "#00ff00";  // Cor inicial para grade de 5



document.getElementById('colorPickerForGrid5').addEventListener('input', function(event) {
    grid5Color = event.target.value;
    if (lastGridType === 'grid5') {
        redrawLastGrid(grid5Color);
    }






});

document.getElementById('grid5').addEventListener('click', function() {
    lastGridType = 'grid5';
    drawGrid(140, 100, grid5Color);
});

document.getElementById('grid7').addEventListener('click', function() {
    lastGridType = 'grid7';
    drawGrid(100, 70, grid5Color);
});

document.getElementById('grid8').addEventListener('click', function() {
    lastGridType = 'grid8';
    drawGrid(80, 60, grid5Color);
});

document.getElementById('grid10').addEventListener('click', function() {
    lastGridType = 'grid20';
    drawGrid(70, 50, grid5Color);
});


document.getElementById('grid12').addEventListener('click', function() {
    lastGridType = 'grid12';
    drawGrid(50, 40, grid5Color);
});

document.getElementById('grid15').addEventListener('click', function() {
    lastGridType = 'grid15';
    drawGrid(40, 30, grid5Color);
});

document.getElementById('grid20').addEventListener('click', function() {
    lastGridType = 'grid20';
    drawGrid(30, 20, grid5Color);
});

// Continuação do app.js

document.getElementById('enlarge').addEventListener('click', enlargeImage, false);

function enlargeImage() {
    let originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let enlargedWidth = canvas.width * 10;
    let enlargedHeight = canvas.height * 10;
    
    canvas.width = enlargedWidth;
    canvas.height = enlargedHeight;
    
    for (let y = 0; y < originalData.height; y++) {
        for (let x = 0; x < originalData.width; x++) {
            let index = (y * originalData.width + x) * 4;
            let r = originalData.data[index];
            let g = originalData.data[index + 1];
            let b = originalData.data[index + 2];
            let a = originalData.data[index + 3];
            
            ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
            ctx.fillRect(x * 10, y * 10, 10, 10);
// document.getElementById('enlarge').style.display = 'none';

        }
    }
}


// Continuação do app.js
document.getElementById('clearButton').addEventListener('click', clearCanvas);



function getUniqueColors(data) {
    let colors = {};
    let colorCount = 0;

    for (let i = 0; i < data.data.length; i += 4) {
        let r = data.data[i];
        let g = data.data[i + 1];
        let b = data.data[i + 2];
        let a = data.data[i + 3];

        // Ignorando a cor preta
        if (r === 0 && g === 0 && b === 0) continue;

        let colorKey = `${r},${g},${b},${a}`;

        if (!colors[colorKey]) {
            colorCount++;
            colors[colorKey] = colorCount;
        }
    }

    return colors;
}
// Continuação do app.js

document.getElementById('number').addEventListener('click', numberImage, false);

function numberImage() {
    let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let colors = getUniqueColors(data);

    for (let y = 0; y < data.height; y += 10) {
        for (let x = 0; x < data.width; x += 10) {
            let index = (y * data.width + x) * 4;
            let r = data.data[index];
            let g = data.data[index + 1];
            let b = data.data[index + 2];
            let a = data.data[index + 3];
            
            if (r === 0 && g === 0 && b === 0) continue;

            let colorKey = `${r},${g},${b},${a}`;
            let number = colors[colorKey];
            
            let numberImage = new Image();
            numberImage.onload = function() {
                ctx.drawImage(numberImage, x, y, 10, 10);
            }
            numberImage.src = `numbers/${number}.png`;
 generateColorLegend(colors);
        }
    }
}




function drawGrid(primarySpacing, secondarySpacing, gridColor) {
    // Desenha a grade primária
    for (let x = 0; x <= canvas.width; x += 10) {
        ctx.strokeStyle = '#696969'; // Cor chumbo
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 10) {
        ctx.strokeStyle = '#696969'; // Cor chumbo
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(canvas.width, y + 0.5);
        ctx.stroke();
    }

    // Desenha a grade secundária
    for (let x = 0; x <= canvas.width; x += primarySpacing) {
        ctx.strokeStyle = gridColor;  // Cor diferente baseada na imagem
        ctx.lineWidth = 1;  // Aumentar a espessura da linha se necessário
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += secondarySpacing) {
        ctx.strokeStyle = gridColor;  // Cor diferente baseada na imagem
        ctx.lineWidth = 1;  // Aumentar a espessura da linha se necessário
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(canvas.width, y + 0.5);
        ctx.stroke();
    }
}

let lastGridType = null;

// Função para redesenhar a última grade com uma nova cor
function redrawLastGrid(newColor) {

    switch (lastGridType) {
        case 'grid5':
            drawGrid(140, 100, newColor);
            break;
        case 'grid10':
            drawGrid(70, 50, newColor);
            break;
        case 'grid7':
            drawGrid(100, 70, newColor);
            break;
        case 'grid8':
            drawGrid(80, 60, newColor);
            break;
         case 'grid12':
            drawGrid(50, 40, newColor);
            break;
            case 'grid15':
            drawGrid(40, 30, newColor);
            break;
            case 'grid20':
            drawGrid(30, 20, newColor);
            break;
        // ... e assim por diante para os outros tamanhos de grades.
        default:
            break;
    }
}
let gridColorValue = "#ff0000";  // Inicialize com a cor padrão ou a cor que você deseja


document.getElementById("gridColor").addEventListener("input", function(event) {
    gridColorValue = event.target.value;
    redrawLastGrid(gridColorValue);
});






// Continuação do app.js

function createDownloadLink(partCounter, projectNameInput, tempCanvas) {
    let downloadLink = document.createElement('a');
    downloadLink.href = tempCanvas.toDataURL();
    downloadLink.download = `${projectNameInput.value || 'ProjetoSemNome'}-parte${partCounter}.png`;
    downloadLink.style.background = 'linear-gradient(to right, purple, mediumblue)';
    downloadLink.style.color = 'white';
    downloadLink.style.padding = '10px 20px';
    downloadLink.style.borderRadius = '4px';
    downloadLink.style.margin = '5px';
    downloadLink.style.display = 'block';
    downloadLink.style.textDecoration = 'none';
    downloadLink.innerHTML = `Baixar Parte ${partCounter}`;
    
    downloadLink.addEventListener('click', function() {
        this.download = `${projectNameInput.value || 'ProjetoSemNome'}-parte${partCounter}.png`;
    });

    return downloadLink;
}

function divideImage(parts) {
    let projectNameInput = document.createElement('input');
    projectNameInput.placeholder = 'Nome do seu projeto';
    projectNameInput.style.marginBottom = '10px';
    projectNameInput.style.padding = '2px';

    let rows, cols;
    switch (parts) {
        case 4:
            rows = cols = 2;
            break;
        case 8:
            rows = 2;
            cols = 4;  // ou rows = 4; cols = 2; dependendo do que você quer
            break;
        case 16:
            rows = cols = 4;
            break;
        default:
            return;
    }

    let partWidth = canvas.width / cols;
    let partHeight = canvas.height / rows;

    let downloadContainer = document.createElement('div');
    downloadContainer.id = 'downloadLinks';
    downloadContainer.style.position = 'fixed';
    downloadContainer.style.right = '0';
    downloadContainer.style.top = '50%';
    downloadContainer.style.transform = 'translateY(-50%)';
    downloadContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    downloadContainer.style.padding = '10px';
    downloadContainer.style.borderTopLeftRadius = '8px';
    downloadContainer.style.borderBottomLeftRadius = '8px';
    downloadContainer.style.zIndex = '1000';

    downloadContainer.appendChild(projectNameInput);

    let partCounter = 1;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let data = ctx.getImageData(x * partWidth, y * partHeight, partWidth, partHeight);
            let tempCanvas = document.createElement('canvas');
            tempCanvas.width = partWidth;
            tempCanvas.height = partHeight;
            tempCanvas.getContext('2d').putImageData(data, 0, 0);

            let downloadLink = createDownloadLink(partCounter, projectNameInput, tempCanvas);
            partCounter++;

            downloadContainer.appendChild(downloadLink);
        }
    }

    document.body.appendChild(downloadContainer);
}



const backButton = document.getElementById('backButton');
if (backButton) {
    backButton.addEventListener('click', function() {
        window.location.href = 'acessoapp.html';
    });
}
function isColorLight(r, g, b) {
    // Formula simples para determinar se uma cor é clara ou escura
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

function generateColorLegend(colors) {
    let legendDiv = document.getElementById("colorLegend");
    legendDiv.innerHTML = '';  
    legendDiv.style.display = 'block';
legendDiv.style.flexWrap = 'wrap';


   for (let colorKey in colors) {
        let colorArray = colorKey.split(",");
        let r = parseInt(colorArray[0]);
        let g = parseInt(colorArray[1]);
        let b = parseInt(colorArray[2]);

        let colorBox = document.createElement('div');
        colorBox.className = 'colorBox';
        colorBox.style.backgroundColor = `rgba(${r},${g},${b},${colorArray[3] / 255})`;
        colorBox.style.color = isColorLight(r, g, b) ? 'black' : 'white';
        
        colorBox.textContent = colors[colorKey];
colorBox.style.marginRight = '10px';

        legendDiv.appendChild(colorBox);

}
let downloadLegendButton = document.createElement('button');
downloadLegendButton.textContent = "⬇️";
downloadLegendButton.style.width = '38px';           // Define uma largura fixa para o botão
downloadLegendButton.style.height = '28px';           // Define uma altura fixa para o botão
downloadLegendButton.style.fontSize = '12px';         // Reduz o tamanho da fonte
downloadLegendButton.style.border = '5px solid #333'; // Adiciona uma borda ao botão
downloadLegendButton.style.borderRadius = '5px';      // Arredonda os cantos do botão
downloadLegendButton.style.cursor = 'pointer';        // Muda o cursor para indicar que é clicável
downloadLegendButton.style.backgroundColor = '#00a6ed';  // Adiciona um fundo cinza claro
downloadLegendButton.style.outline = 'none';          // Remove o contorno ao clicar no botão
downloadLegendButton.style.marginBottom = '20px';     // Adiciona uma margem abaixo para separá-lo da legenda
legendDiv.appendChild(downloadLegendButton);

downloadLegendButton.addEventListener('click', downloadLegendAsImage);

    }
function downloadLegendAsImage() {
    let legendItems = document.querySelectorAll('.colorBox');
    let itemWidth = 50;
    let itemHeight = 50;
    let spacing = 10;

    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = (itemWidth + spacing) * legendItems.length;
    tempCanvas.height = itemHeight;
    let tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    legendItems.forEach((item, index) => {
        let color = item.style.backgroundColor;
        tempCtx.fillStyle = color;
        let x = index * (itemWidth + spacing);
        tempCtx.fillRect(x, 0, itemWidth, itemHeight);

        tempCtx.strokeStyle = 'black';
        tempCtx.lineWidth = 2;
        tempCtx.strokeRect(x, 0, itemWidth, itemHeight);

        let number = item.textContent;
        tempCtx.fillStyle = item.style.color;
        tempCtx.font = "20px Arial";
        tempCtx.textAlign = "center";
        tempCtx.textBaseline = "middle";
        tempCtx.fillText(number, x + itemWidth / 2, itemHeight / 2);
    });

    let link = document.createElement('a');
    link.href = tempCanvas.toDataURL();
    link.download = 'gabarito.png';
    link.click();
}

document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'acessoapp.html';
});
document.getElementById('downloadProject').addEventListener('click', function() {
    console.log("Clique no botão 'Baixar Projeto' detectado!");  // Esta linha é para fins de diagnóstico

    let link = document.createElement('a');
    link.href = canvas.toDataURL();  // Convertendo o conteúdo atual do canvas para uma imagem
    link.download = 'projeto.png';
    document.body.appendChild(link);  // Vamos adicionar o link ao corpo para garantir que ele possa ser clicado
    link.click();
    document.body.removeChild(link);  // Removendo o link após o clique
});
