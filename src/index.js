const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const http = require("http")
 
const app = express()
const server = http.createServer(app)
const io = socketio(server)
 

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

blobs= []

function Blob(id,x,y,r){
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}


setInterval(clock1,33.3);

function clock1(){
  io.sockets.emit('clock1',blobs)
}

io.on('connection',(socket)=>{
  //console.log('new user')
  socket.broadcast.emit('message','new user added !')


  socket.on('start',(data)=>{
      //console.log(socket.id + " " + data.x+' '+ data.y + ' '+ data.r )
      var blob = new Blob(socket.id , data.x, data.y,data.r )
      blobs.push(blob)
      //console.log(blobs);
  })

  socket.on('update',(data)=>{
      //console.log(socket.id + " " + data.x+' '+ data.y + ' '+ data.r )

      var blob = blobs.find((blob1)=> blob1.id === socket.id)

      // for(var i=0; i<blobs.length ; i++){
      //   if(socket.id == blobs[i].id){            //use find function using bruteforce
      //     blob = blobs[i]
      //   }
      // }
      if (typeof(blob) != "undefined"){
        blob.x = data.x;
        blob.y = data.y;     //first change this advait just copy the object which you will get by find function
        blob.r  = blob.r
      }
  })

  socket.on('delete_blob',(id)=>{                             // id of blob getting eaten
    var index = blobs.findIndex((blob)=>blob.id === id) 
    //console.log("index of blob getting eaten", index)
    if(index !== -1){
      socket.to(blobs[index].id).emit('got_eaten')
      blobs.splice(index,1)
      console.log('array after eating',blobs)
      //console.log("here is id of blob getting eaten",blobs[index].id,blobs)  
    }
    //console.log(blobs)
  })

  socket.on('disconnect',()=>{
    var index = blobs.findIndex((blob)=>blob.id === socket.id)
    if(index !== -1){
        blobs.splice(index,1)
        socket.broadcast.emit('message','one user left')
    }


  })

})


server.listen(port,()=>{
    console.log(`server is running on post ${port}`)
})
