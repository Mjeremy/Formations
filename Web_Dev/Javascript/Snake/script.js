window.onload = function()
{
    var canvasWidht = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 500; //millisec
    var snakee;
    var applee;
    
    init();
    
    
    function init()
    {
        var canvas = document.createElement('canvas');
        canvas.width = canvasWidht;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4],[5,4],[4,4]], "right");
        applee = new Apple([10,10]);
        refreshCanvas();
    }
    
    function refreshCanvas()
    {
        ctx.clearRect(0, 0, canvasWidht, canvasHeight);
        
        snakee.draw();
        try{
            snakee.advance();
            applee.draw();
            setTimeout(refreshCanvas,delay);
        }catch(err){
            console.log("PERDU");
        }
    }
    
    function Snake(body, direction)
    {
        this.body = body;
        this.direction = direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++)
                {
                    drawBlock(ctx, this.body[i]);
                }
            ctx.restore();
                                
        };
        
        this.advance = function()
        {
            var nextPos = this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextPos[0] -= 1;
                    break;
                case "right":
                    nextPos[0] += 1;
                    break;
                case "down":
                    nextPos[1] += 1;
                    break;
                case "up":
                    nextPos[1] -= 1;
                    break;
                default:
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPos); //ajoute à la première place
            this.body.pop();
            
            if((this.body[0][0]*blockSize > canvasWidht) 
                || (this.body[0][1]*blockSize > canvasHeight)
                || (this.body[0][0]*blockSize < 0)
                || (this.body[0][1]*blockSize < 0)
              )
            {
                throw("Serpent en dehors du canvas");
            }
        };
        
        this.setDirection = function (newDirection)
        {
            var allowedDirections;
            switch(this.direction)
            {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "up":
                case "down":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");    
            }
            
            if(allowedDirections.indexOf(newDirection) > -1)
                {
                    this.direction = newDirection;
                }
        };
        
        this.checkCollision = function()
        {
            var wallColision = false;
            var snakeColision = false;
        }
    }
    
    
    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = position[0]*blockSize + radius;
            var y = position[1]*blockSize + radius;
            ctx.arc(x,y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };
    }
    
    document.onkeydown = function handleKeyDown(e)
    {
        var key = e.keyCode;
        var newDirection;
        
        switch(key)
        {
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
            default:
                return;
        }
        
        snakee.setDirection(newDirection);
        
    }
    
    function drawBlock(ctx, pos)
    {
        var x = pos[0] * blockSize;
        var y = pos[1] * blockSize;
        ctx.fillRect(x,y, blockSize, blockSize);
    }

    
    
}