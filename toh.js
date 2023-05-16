enable_drop();
const startButton = document.getElementById("start");
tem=500;
disk=2;
inc();
maxmoves=0;
var Moves=0
flag=0

function noapp(){
    if(flag==1)
    {
        document.getElementById("arrow2").disabled=true;
        document.getElementById("append").disabled=true;

        
    }

}

function nam(){
    document.getElementById("wrapper").style.display="none";
    document.getElementById("Form1").style.display = "block";
    document.getElementById("box2").style.display = "block";
}

function box(){
    document.getElementById("wrapper").style.display="none";
    document.getElementById("Form1").style.display="none";
    document.getElementById("box2").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("Box").style.display = "block";
}
 
function towers(k,A,B,C)
{
    let diskid="disk"+k;
    let diskEle=document.getElementById(diskid);
 if(k==1)
{
    move(diskEle,C);
    console.log("Move disk"+k+" from "+A.id+" to "+C.id)
    return ;
}
    towers(k-1,A,C,B);
    move(diskEle,C);
    console.log("Move disk"+k+" from "+A.id+" to "+C.id)
    towers(k-1,B,A,C);
}



function tower()
{
    var A=document.getElementById("pole11");
    var B=document.getElementById("pole21");
    var C=document.getElementById("pole31");
    towers(disk,A,B,C);
}

function move(ele,D)
{
    setTimeout(() => { D.appendChild(ele);},tem);
    tem+=1000;

}



function appenddisk(){
    if(disk<8){
    disk+=1;
    document.getElementById("noofdisk").innerHTML="Disks:"+disk;
    }
    maxmoves=(2**disk)-1;
    document.getElementById("max").innerHTML="Minimum Moves:"+maxmoves;
}

function inc(){
    for(let i=1;i<=disk;i++)
    {
        document.getElementById(`disk${i}`).style.display = "block";
    }
}

function deletedisk(){
    if(disk<=8 && disk>0)
    {
      disk-=1;
      document.getElementById("noofdisk").innerHTML="Disks:"+disk;  
    }
    maxmoves=(2**disk)-1;
    document.getElementById("max").innerHTML="Minimum Moves:"+maxmoves;
}

function dec(){
    for(let i=8;i>disk;i--)
    {
        document.getElementById(`disk${i}`).style.display = "none";
    }
}


function win(){
        A=document.getElementById("pole11");
        B=document.getElementById("pole21");
        C=document.getElementById("pole31");

        let d=C.children.length;
        console.log(d);

        if(d==disk)
        {
            window.alert("YOU WIN");  
        }
//         for(let i=1;i<=disk;i++)
//         {
            
//             d=C.children;
//             console.log(d[0]);
//             if(d[i-1]==document.getElementById(`disk${i}`))
//             {
//                 console.log(`disk${i}`);
//                 flag=1;
//             }
//         }

//         if(flag==1)
//         {
//             window.alert("YOU WIN");
//         }
 }



function allowDrop(ev) {
    ev.preventDefault();
  
  }
  
function drag(ev) {
    //Stores the id of the element on which the event(dragging) is happening.Data transfer is a inbuilt object.
    ev.dataTransfer.setData("text", ev.target.id);
 }
  
function drop(ev) {
    // ev.preventDefault();

    //Target=pole,Drop event is happening on the pole.Last element(disk) in the pole is fetched and is saved in drp.
    let drp=ev.target.lastElementChild;

    let y=ev.target.classList[0];
    //data variable contains the id of the element on which the drag event happened.It uses getdata() to fetch the id from datatransfer object.
    var data = ev.dataTransfer.getData("text");

    z=document.getElementById(data);
    
    if(z.classList[0]!=y)
    {
    //If pole is empty drp is null else if id of drp greater than data the element is appended.In the regular expression non-digits are replaced with ""
        if(drp==null || drp.id.replace(/[^0-9]/g,"")>data.replace(/[^0-9]/g,""))
        {
            //element(disk) is fetched using the id in data.
            ev.target.appendChild(document.getElementById(data));
            Moves+=1;
            document.getElementById("moves").innerHTML="Moves:"+Moves;
            enable_drop();
            win();
            flag=1; 
            noapp();
        
        }
        else
        {
            window.alert("Invalid Move");
        }
   
    }

}

function enable_drop(){
    discs=document.getElementsByClassName("disk");
    for(let i=0;i<discs.length;i++)
    {
        discs[i].removeAttribute("ondragstart");
        discs[i].removeAttribute("draggable");
    }

    poles=document.getElementsByClassName("pole");

    for(let j=0;j<poles.length;j++)
    {
        x=poles[j].lastElementChild;
        if(x==null)
        {
            continue;
        }
        else
        {
        x.setAttribute("draggable","true");    
        x.setAttribute("ondragstart","drag(event)");    
        }
    }
}

