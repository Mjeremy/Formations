window.onload = function()
{
    var canvasWidht = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 300; //millisec
    var snakee;
    var applee;
    var widthInBlock = canvasWidht / blockSize;
    var heightInBlock = canvasHeight / blockSize;
    
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
        snakee.advance();
        if(snakee.checkCollision())
        {
                
        }
        else
        {
            if(snakee.isEatingApple(applee))
                {
                    do{
                        applee.setNewPosition();
                    }while(applee.isOnSnake(snakee))
                    
                }
            ctx.clearRect(0, 0, canvasWidht, canvasHeight);
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas,delay); 
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
            
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlock - 1;
            var maxY = heightInBlock - 1;
            var isNotBetweenHorizWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVertWalls = snakeY < minY || snakeY > maxY;
            
            if(isNotBetweenHorizWalls || isNotBetweenVertWalls)
            {
                wallColision = true;
            }
            
            for(var i = 0; i < rest.length; i++)
                {
                    if((snakeX === rest[i][0]) && (snakeY === rest[i][1]))
                       {
                            snakeColision = true;
                       }
                }
            
            return wallColision || snakeColision;
        };
        
        this.isEatingApple = function(appleToEat)
        {
            var head = this.body[0];
            
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])

                    return true;
            else    
                    return false;
        };
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
            var x = this.position[0]*blockSize + radius;
            var y = this.position[1]*blockSize + radius;
            ctx.arc(x,y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        };
        
        this.setNewPosition = function()
        {
            var newX = Math.round(Math.random() * (widthInBlock -1)); 
            var newY = Math.round(Math.random() * (heightInBlock -1));
            this.position = [newX, newY];
        }; 
        
        this.isOnSnake = function(snakeToCheck)
        {
            var isOnSnake = false;
            for(var i =0; i < snakeToCheck.body.length; i++)
                {
                    if(this.position[0] === snakeToCheck.body[i][0]
                      && this.position[1] === snakeToCheck.body[i][1])
                        {
                            isOnSnake = true;
                        }
                }
            
            return isOnSnake;
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