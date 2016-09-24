function createWaterFall(waterNum){
	var flag=1,
		i,
		warp=getElement(document,'#warp',false),
		num=0,
		columns;
	creatWater(waterNum);
	warterFall(num);
	addEvent(window,'resize',function(){
		warterFall(num);
	});
	addEvent(window,'scroll',function(e){
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		var viewHeight =Math.min(document.documentElement.scrollHeight,document.documentElement.clientHeight);
		var docHeight=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
		if((scrollTop-docHeight+viewHeight)>=-1){
			creatWater(data.length-num-columns*2>0?columns*2:data.length-num);
			warterFall(num);
		}
	});
	function findMinIndex(boxsH,columns){
			var main=Math.min.apply(null,boxsH);
			for(var t=0;t<columns;t++){
				if(main==boxsH[t]){
					return t;
				}	
			}
	}	
	function warterFall(curNum){
		var i=0,
			boxs=getElement(warp,'.box',false),
			winWidth=window.innerWidth||document.body.clientWidth,
			boxW=boxs[0].offsetWidth;
			columns=Math.floor(warp.offsetWidth/boxW);
		var boxsH=[];
		for(;i<curNum;i++){
			if(i<columns){
				boxsH.length=columns;
				boxsH[i]=boxs[i].offsetHeight;
				boxs[i].style.cssText='position:absolute;top:0px;left:'+(i*boxW)+'px;';
				flag=0;
			}
			else{
				var minIndex=findMinIndex(boxsH,columns);
				boxs[i].style.cssText='position:absolute;top:'+(boxsH[minIndex])+'px;left:'+(minIndex*boxW)+'px;';
				boxsH[minIndex]=boxsH[minIndex]+boxs[i].offsetHeight;
			}
		}
	};	
	function creatWater(WaterNum){
		for(i=0;i<WaterNum;i++){
			++num;
			var box=document.createElement('div');
			box.className='box';
			var poster=document.createElement('div');
			poster.id='poster';
			var img=document.createElement('img');
			img.src=data[i].img;
			poster.appendChild(img);
			var p=document.createElement('p');
			p.innerHTML=data[i].desc;
			poster.appendChild(p);
			box.appendChild(poster);
			warp.appendChild(box);	
		}
	}
};
createWaterFall(10);	