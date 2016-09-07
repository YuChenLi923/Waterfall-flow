function addEvent(func){
	var oldEvent=window.onload;
	if(oldEvent=='undefined')
		window.onload=func();
	else
		window.onload=function(){
			func;
			oldEvent;
		};
}
function getByClass(Parent,Class)
{
	var classNodes=new Array();
	var nodes=Parent.getElementsByTagName('*');
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].className==Class){
			classNodes.push(nodes[i]);
		}
	}
	return classNodes;
}
function createWaterFall(waterNum){
	var flag=1,
		i,
		warp=document.getElementById('warp'),
		num=0,
		columns;
	creatWater(waterNum);
	warterFall(num);
	window.onresize=function(){
		warterFall(num);
	}
	window.onscroll=function(e){
		var event=e||window.event;
		var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
		var viewHeight = document.documentElement.clientHeight;
		var docHeight=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
		if((scrollTop-docHeight+viewHeight)>=0){
			creatWater(data.length-num-columns*2>0?columns*2:data.length-num);
			warterFall(num);
		}
	};
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
			boxs=getByClass(warp,'box'),
			winWidth=window.innerWidth||document.body.clientWidth,
			boxW=boxs[0].offsetWidth;
			columns=Math.floor(warp.offsetWidth/boxW);
		var boxsH=[];
		for(;i<curNum;i++){
			if(i<columns){
				boxsH.length=columns;
				boxsH[i]=boxs[i].offsetHeight;
				console.log(i);
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
addEvent(createWaterFall(10));	