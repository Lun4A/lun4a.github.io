mod.scroll=(function mod_scroll(r){
	r.EndDOM(function(){
		var a=document.createElement("div");
		a.innerHTML='<div class="mod-scbar"><div class="mod-sctrack"></div><iframe class="mod-scifr"></div>';
		r.node=a.lastChild;

		a=document.createElement("style");
		a.textContent=".mod-scbar{z-index:9;position:fixed;user-select:none}.mod-sctrack{position:absolute;left:0;top:0}.mod-scifr{position:absolute;top:0;left:0;width:100%;height:100%;visibility:hidden;pointer-events:none}"+
		".mod-scbarV{top:0;right:0;width:8px;height:100%}.mod-scbarV .mod-sctrack{width:inherit}"+
		".mod-scbarH{left:0;bottom:0;width:100%;height:8px}.mod-scbarH .mod-sctrack{height:inherit}";
		document.head.appendChild(a);
	
		window.addEventListener("mousewheel",whl);
		window.addEventListener("wheel",whl);
		window.addEventListener("focus",function(){

		});
		window.addEventListener("blur",function(){

		});
		window.addEventListener("keydown",function(e){
			var d=document,f=d.activeElement;
			if(!f||f!=d.body)return;

			switch(e.keyCode){
			case 32:case 34:
				if(e.shiftKey)r.curH.scroll(1,1);
				else r.curV.scroll(1,1);
			break;
			case 33:
				if(e.shiftKey)r.curH.scroll(-1,1);
				else r.curV.scroll(-1,1);
			break;
			case 35:
				if(e.shiftKey)r.curH.scroll(0,3);
				else r.curV.scroll(0,3);
			break;
			case 36:
				if(e.shiftKey)r.curH.scroll(0,2);
				else r.curV.scroll(0,2);
			break;
			case 38:r.curV.scroll(-30);break;
			case 37:r.curH.scroll(-30);break;
			case 39:r.curH.scroll(30);break;
			case 40:r.curV.scroll(30);break;
			}
		});
	});

	function whl(e){
		if(e.shiftKey)if(r.curH)r.curH.scroll(e.deltaX);
		else if(r.curV)r.curV.scroll(e.deltaY);
	}

	return r;
})({
	EndDOM:function(a){
		var t=this;
		mod.EndDOM(function(){
			if(t.check())a();
		});
	},
	curV:null,curH:null,
	check:function(){
		var a=document.createElement("div"),b=document.body,c;
		a.style.cssText="z-index:-1;position:absolute;overflow:scroll";
		b.appendChild(a);
		c=a.offsetWidth;
		b.removeChild(a);
		return c;
	},
	new:function(o){
		var node=this.node.cloneNode(true),tmp=node.children,track=tmp[0],ifr=tmp[1],
		r={
			option:o
		},v_h1=0,v_h2=0;

		o.target.style.overflow="hidden";
		if(!("select" in o))o.select=1;
		if(o.select)this["cur"+o.type]=r;
		
		node.className+=" mod-scbar"+o.type;

		if(o.parent)o.parent.appendChild(node);if(o.content)o.content.appendChild(ifr);

		if(o.type=="V"){
			mHi();
			onE(ifr,function(){
				mHi(),re();
			});
			r.scroll=function(v,w){
				switch(w){
				case 1:v=v*o.target.clientHeight/2;break;
				case 2:o.target.scrollTop=0,v=0;break;
				case 3:o.target.scrollTop=o.target.scrollHeight-o.target.clientHeight,v=0;break;
				}
				o.target.scrollTop+=v;
				re();
			};
			node.onmousedown=function(e){
				addE(mVd,mVu,mVm);
				return false;
			};
			function re(){
				var a=o.target.scrollHeight-o.target.clientHeight;
				track.style.top=(v_h1*o.target.scrollTop/a)+"px";
			}
			function mHi(){
				track.style.height=(o.target.clientHeight*o.target.clientHeight/o.target.scrollHeight)+"px";
				v_h1=node.clientHeight-track.clientHeight;
				v_h2=track.clientHeight/2;
			}
			function mVd(e){
				mVm(e);
			}
			function mVu(e){
				mVm(e);
				subE(mVd,mVu,mVm);
			}
			function mVm(e){
				var a=e.y-v_h2;
				if(a<0)a=0;
				else if(a>v_h1)a=v_h1;
				track.style.top=a+"px";
				o.target.scrollTop=(o.target.scrollHeight-o.target.clientHeight)*a/v_h1;
			}
		}else{
			r.scroll=function(v,w){o.target.scrollLeft+=v};
			node.onmousedown=function(e){
				v_h2=e.clientX;
				node.onmousemove=mH;
			};
			node.onmouseup=function(e){
				node.onmousemove=null;
				mH(e);
			};
			function mH(e){
				track.style.left=(e.clientY-v_h2)+"px";
				console.log(e);
			};
		}

		return r;

		var ii;
		function iistart(h){
			if(!ii)ii=setInterval(h,10);
		}
		function iistop(){
			if(ii)clearInterval(ii),ii=0;
		}
		function addE(d,u,m){
			window.addEventListener("mousedown",d),window.addEventListener("mouseup",u),window.addEventListener("mousemove",m);
		}
		function subE(d,u,m){
			window.removeEventListener("mousedown",d),window.removeEventListener("mouseup",u),window.removeEventListener("mousemove",m);
		}
		function onE(a,b){
			var d=a.contentDocument,w=a.contentWindow;
			d.open("text/html"),d.close();
			w.onresize=b;
		}
	}
})