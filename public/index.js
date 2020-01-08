// fileButton.addEventListener('change',function(e){
//     for(let i=0;i<e.target.files.length;i++)
//     {
//         let imageFile=e.target.files[i]
//         let storageRef=firebase.storage().ref("Images/"+imageFile.name)

//         let task=storageRef.put(imageFile)

//         task.on('state_changed',function progress(snapshot){
//             let percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100
//             console.log("Update is "+percentage+" %done")

//             switch(snapshot.state)
//             {
//                 case firebase.storage.TaskState.PAUSED:
//                     console.log("Upload is Paused")
//                     break;
//                 case firebase.storage.TaskState.RUNNING:
//                     console.log("Upload is Runnning")
//                     break; 
                
//             }
//         })
//     }
// })

// let i = -1;
// let j = 0;
// let sounds = [];
// let saved_rec = [];
// function Rec(){
//     // alert('U r going to grant access to your microphone!!');
//         navigator.mediaDevices.getUserMedia({ audio: true })
//           .then(stream => {
//             const mediaRecorder = new MediaRecorder(stream);
//             let audioChunks = [];
//             mediaRecorder.start();
//             i = i + 1;
        
//             mediaRecorder.addEventListener("dataavailable", event => {
//               audioChunks.push(event.data);
//             });

//             mediaRecorder.addEventListener("stop", () => {
//                 const audioBlob = new Blob(audioChunks);
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 let audio = new Audio(audioUrl);
//                 sounds.push({
//                     audio : audio,
//                     link : audioBlob
//                 });
//                 return ;
//               });
              
//               $('#stop').on('click',function(){
//                   let state=mediaRecorder.state
//                   if(state!=="inactive")
//                   {
//                     mediaRecorder.stop();
//                     let j=i+1
//                     $('#list').append(
//                         $('<li>')
//                             .text("Voice Rec."+j+".")
//                             .append(
//                                 $('<button>')
//                                     .text("Play")
//                                     .attr('id','play')
//                                     .on('click',function(){
//                                         let num = parseInt(($(this).parent().text()).split('.')[1]);
//                                         sounds[num-1].audio.play();
//                                         console.log("Hello" + sounds[num-1].type);
//                                     })
//                                 ,
//                                 $('<button>')
//                                     .text('Save')
//                                     .attr('id','save')
//                                     .on('click',function(){
//                                         let num = parseInt(($(this).parent().text()).split('.')[1]);
//                                         saved_rec.push(sounds[num-1]);
//                                         firebase.storage().ref().put(sounds[num-1]).then(function(snapshot) {
//                                           console.log('Uploaded a blob or file!');
//                                        })
//                                         console.log(saved_rec);
//                                         alert('This Recording is Saved');
//                                     })
//                         )
//                     )
//                   }
//               });
//           });
//         }

// let i = -1;
// let sounds = [];
// function Rec(){
//     // alert('U r going to grant access to your microphone!!');
//         navigator.mediaDevices.getUserMedia({ audio: true })
//           .then(stream => {
//             const mediaRecorder = new MediaRecorder(stream);
//             let audioChunks = [];
//             mediaRecorder.start();
//             i = i + 1;
        
//             mediaRecorder.addEventListener("dataavailable", event => {
//               audioChunks.push(event.data);
//             });

//             mediaRecorder.addEventListener("stop", () => {
//                 const audioBlob = new Blob(audioChunks);
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 let audio = new Audio(audioUrl);
//                 sounds.push(audio);
//                 return ;
//               });
              
//               $('#stop').on('click',function(){
//                   let state=mediaRecorder.state
//                   if(state!=="inactive")
//                   {
//                     mediaRecorder.stop();
//                     let j=i+1
//                     $('#list').append(
//                         $('<li>')
//                         .text("Voice Rec."+j+".")
//                         .append(
//                             $('<button>').text("Play").attr('id','play').on('click',function(){
//                                 let num=+($(this).parent().text().split('.')[1])
//                                 console.log(num-1)
//                                 sounds[num-1].play();
//                                 console.log(typeof(sounds[i]))
//                             })
//                         )
//                         .append(
//                             $('<button>').text("Save").attr('id','save').on('click',function(){
//                                 let num=+($(this).parent().text().split('.')[1])
//                                 // let blobUpload=new File(sounds[num-1],'voive.wav')
//                                 // firebase.storage().ref().put(blobUpload).then(function(snapshot) {
//                                 //     console.log('Uploaded a blob or file!');
//                                 //   });
//                                 ref().put(sounds[num-1]).then(function(snapshot){
//                                     console.log("Uploaded on Firebase")
//                                 })
                                  
//                             })
//                         )
//                     )
//                   }
//               });
//           });
//         }


let i = -1;
let j = 0;
let sounds = [];
let saved_rec = [];
function Rec(){
    // alert('U r going to grant access to your microphone!!');
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            let audioChunks = [];
            mediaRecorder.start();
            i = i + 1;
        
            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks,{ 'type' : 'audio/wav; codecs=MS_PCM' });
                const audioUrl = URL.createObjectURL(audioBlob);
                let audio = new Audio(audioUrl);
                sounds.push({
                    audio : audio,
                    blob : audioBlob
                });
                return ;
              });
              
              $('#stop').on('click',function(){
                  let state=mediaRecorder.state
                  if(state!=="inactive")
                  {
                    mediaRecorder.stop();
                    let clip=sounds[i]
                    let j=i+1
                    $('#list').append(
                        $('<li>')
                            .text("Voice Rec."+j+".")
                            .append(
                                $('<button>')
                                    .text("Play")
                                    .attr('id','play')
                                    .on('click',function(){
                                        let num = parseInt(($(this).parent().text()).split('.')[1]);
                                        // let arr = str.split('.');
                                        // let num=parseInt(arr[1]);
                                        sounds[num-1].audio.play();
                                        console.log("Hello" + typeof(sounds[num-1].blob));
                                    // console.log(typeof(sounds[i]))
                                    })
                                ,
                                $('<button>')
                                    .text('Save')
                                    .attr('id','save')
                                    .on('click',function(){
                                        let num = parseInt(($(this).parent().text()).split('.')[1]);
                                        saved_rec.push(sounds[num-1].audio);
                                            //    firebase.storage().ref().put(sounds[num-1]).then(function(snapshot) {
                                            //       console.log('Uploaded a blob or file!');
                                            //    })
                                        // console.log(saved_rec);
                                        let x =sounds[num-1].blob;
                                        let str = 'Audio' + num;
                                        let storage = firebase.storage().ref(str);
                                        let task = storage.put(sounds[num-1].blob);
                                        task.on('state_changed',function progress(snapshot){
                                            let percentage = snapshot.bytesTransferred/snapshot.totalBytes *100;
                                            console.log('Upload is : ' + percentage + '% done');
                                            switch(snapshot.state){
                                                case firebase.storage.TaskState.PAUSED :
                                                    console.log('Upload is Paused');
                                                    break;
                                                case firebase.storage.TaskState.RUNNING :
                                                    console.log('Uploading...Pls Wait');
                                                    break;
                                            }
                                            storage.getDownloadURL().then(function(url) {
                                                // `url` is the download URL for 'images/stars.jpg'
                                              
                                                // This can be downloaded directly:
                                                var xhr = new XMLHttpRequest();
                                                xhr.responseType = 'blob';
                                                xhr.onload = function(event) {
                                                  var blob = xhr.response;
                                                };
                                                xhr.open('GET', url);
                                                xhr.send();
                                                console.log(url);
                                              }).catch(function(error) {
                                                // Handle any errors
                                                console.log('Failure');
                                              });
                                              
                                        })
                                        
                                        alert('This Recording is Saved');
                                    })
                        )
                    )
                  }
              });
          });
        }