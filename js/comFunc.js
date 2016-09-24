function getElement(obj,select,dynamic){
	var elem=null,
		flag=select.charAt(0);
	if(flag==='#'){
		if(document.querySelector&&dynamic==false){
			elem=obj.querySelector(select);
		}
		else{
			elem=obj.getElementById(select.slice(1));
		}
	}
	if(flag==='.'){
		if(document.querySelectorAll&&dynamic==false){
			elem=obj.querySelectorAll(select);
		}
		else{
			if(document.getElementsByClassName){
				elem=obj.getElementsByClassName(select.slice(1));
			}
			else{
				var AllElem=document.getElementsByTagName('*'),
					result=[];
				for(var i=0;i<AllElem.length;i++){
					if(AllElem[i].className==select.slice(1)){
						result.push(AllElem[i]);
					}
				}
				elem=result;
			}
		}
	}
	if(flag!='.'&&select.charAt(0)!='#'){
		if(document.querySelectorAll&&dynamic==false){
			elem=obj.querySelectorAll(select);
		}
		else{
			elem=obj.getElementsByTagName(select);
		}
	}
	return elem;
}

function addEvent(Obj,e,func) {
	if(window.addEventListener){
		Obj.addEventListener(e,func);
	}
	else{
		Obj.attachEvent('on'+e,func);
	}//添加事件处理程序
}