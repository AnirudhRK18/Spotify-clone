import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'


 export const Playercontext=createContext();


const Playercontextprovider=(props)=>{


    const audioref=useRef();
    const seekbg=useRef();
    const seekbar=useRef();


    const url="http://localhost:8080"

    const [songsData,setsongdata]=useState([])
    const [albumdata,setalbumdata]=useState([])

    const [track,settrack]=useState(songsData[0]);
    const [playstatus,setplaystatus]=useState(false);
    const [time,settime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const play=()=>{
        audioref.current.play();
        setplaystatus(true);
    };

    const pause=()=>{
        audioref.current.pause();
        setplaystatus(false);
    }

    const playwithid=async(id)=>{
       await songsData.map((item)=>{
        if(id===item._id){
            settrack(item);
        }
       })

       await audioref.current.play();
       setplaystatus(true)
    }

    const prev=async()=>{
        if(track.id>0){
            await settrack(songsData[track.id-1])
            await audioref.current.play();
            setplaystatus(true);
        }
    }

    const next=async()=>{
        if(track.id<songsData.length-1){
            await settrack(songsData[track.id+1])
            await audioref.current.play();
            setplaystatus(true);
        }
    }

    const seeksong=async(e)=>{
        audioref.current.currentTime=((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioref.current.duration);
    }



    const getsongdata=async()=>{
        try {
            const res=await axios.get(`${url}/api/song/listsong`)

            setsongdata(res.data);
            settrack(res.data[0]);
            

        } catch (error) {
            console.log("error in getsongdata",error);
        }
    }


    const getalbumdata=async()=>{
        try {
            const res=await axios.get(`${url}/api/album/listalbum`)

            setalbumdata(res.data.allalbums);
            console.log(res.data.allalbums);
           
            
        } catch (error) {
            console.log("error in getalbumdata",error);
        }
    }





    useEffect(()=>{
        setTimeout(()=>{
            audioref.current.ontimeupdate=()=>{
                seekbar.current.style.width=(Math.floor
                    (audioref.current.currentTime/audioref.current.duration*100)+"%"
                )
                settime({
                    currentTime:{
                        second:Math.floor(audioref.current.currentTime%60),
                        minute:Math.floor(audioref.current.currentTime/60)
                    },
                    totalTime:{
                        second:Math.floor(audioref.current.duration%60),
                        minute:Math.floor(audioref.current.duration/60)
                    }
                })
            }
       } ,1000)
    },[audioref])


    useEffect(()=>{
        getsongdata();
        getalbumdata();
    },[])

    const contextValue={
        audioref,seekbg,seekbar,track,setplaystatus,settime,settrack,time,playstatus,pause,play,
        playwithid,prev,next,seeksong,songsData,albumdata
    }

    return (
        <Playercontext.Provider value={contextValue}>
            {props.children}
        </Playercontext.Provider>
    )
}


export default Playercontextprovider;