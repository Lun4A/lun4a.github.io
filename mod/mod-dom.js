mod.dom=(function mod_dom(r){

	return r;
})({
	new:function(src,o){
		var d=document.createDocumentFragment(),
		r={
			option:o,
			insert:this.insert,
			insertPrev:this.insertPrev,
			insertNext:this.insertNext
		};

		d.innerHTML=src;

		for(var n in o.exec)if(r[n]){r[n].apply(r,o.exec[n]);break;}

		return r;
	},
	var:function(r,t,m){
		m=m||"var";
		for(var m0=new RegExp("^#"+m+"\\b"),rule,s=(t||document).querySelectorAll("style"),i=s.length-1;i>=0;i--){
			rule = s[i].sheet.cssRules;
	
			if(rule==null)continue;
	
			for(var j=rule.length-1,n;j>=0;j--){
				n=rule[j].selectorText;
				if(!n)continue;
				if(m0.exec(n)){
					r[n.replace(/.*?,\s*/,"")]=rule[j];
					rule[j].selectorText=n.split(",")[1];
				}
			}
		}
	
		for(var s=(t||document).querySelectorAll("[class^='"+m+"']"),i=s.length-1;i>=0;i--){
			r[s[i].classList[1]]=s[i];
		}
	},
	evt:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		var arr2=[],x=arr.length-1,a=arguments;
		for(;x>=0;x--){
			if(arr[x].constructor==String){
				arr2.push.apply(arr2,document.querySelectorAll(arr[x]));
			}else{
				arr[x].addEventListener(a[1],a[2]);
			}
		}
		if(arr2.length)a[0]=arr2,this.evt.apply(this,a);
	},
	evt_click:function(proc,arr){
		arr=arr||[HTMLButtonElement,HTMLAnchorElement];
		return function(e){
			for(var c=0,n,l,v,u,j=0,p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
				if(arr.indexOf(p.constructor)<0)continue;
				if(n=p.name||p.href){
					n=n.split(";"),l=n.length;
					for(;j<l;j++){
						if(v=n[j].split("\t"),u=v.shift(),u in proc)c++,proc[u].apply(proc,v);
					}
				}
				if(c<1&&"*" in proc)proc["*"].call(p,e);
			}
		};
	},
	rot:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		var ret,arr2=[],x=arr.length-1,a=arguments;
		for(;x>=0;x--){
			if(arr[x].constructor==String){
				arr2.push.apply(arr2,document.querySelectorAll(arr[x]));
			}else{
				var n=arr[x].className;
				if(a.length==2)a=[a[0],a[1],""];
				for(var i=1,l=a.length;i<l;i++){
					ret=i-1;
					if(a[i]==""){
						arr[x].className=n.replace(/(\s*)$/," "+a[1]).trim();
						break;
					}else if(n.match(new RegExp("\\b"+a[i]+"\\b"))){
						arr[x].className=n.replace(new RegExp("(\s*)\\b"+a[i]+"\\b")," "+a[(i+1)%l||1]).trim();
						break;
					}
				}
			}
		}
		if(arr2.length)a[0]=arr2,ret=this.rot.apply(this,a);
		return ret;
	},
	rmv:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		var ret=[],arr2=[],x=arr.length-1,a=arguments;
		for(;x>=0;x--){
			if(arr[x].constructor==String){
				arr2.push.apply(arr2,document.querySelectorAll(arr[x]));
			}else{
				var n=arr[x].className;
				for(var i=1,l=a.length;i<l;i++){
					if(n.match(a[i])){
						ret.push(a[i]);
						n=n.replace(new RegExp("(\s*)"+a[i]),"").trim();
					}
				}
				arr[x].className=n;
			}
		}
		if(arr2.length)a[0]=arr2,ret.push.apply(ret,this.rmv.apply(this,a));
		return ret;
	},
	focus:function(node){
		document.querySelectorAll(node).focus();
	},
	clone:function(list_node){
		var i,r=[];
		for(i=list_node.length-1;i>=0;i--)r[i]=list_node[i].cloneNode(true);
		return r;
	},
	insert:function(parent0,new0,offset0){
		var ch=parent0.children[offset0<0?parent0.children.length+offset0:offset0];
		if(ch)for(var i=0,l=new0.length;i<l;i++)parent0.insertBefore(new0[i],ch);
		else for(var i=0,l=new0.length;i<l;i++)parent0.appendChild(new0[i]);
	},
	insertPrev:function(child0,new0,offset0){
		var i,p=child0.parentNode,ch=p.children;
		for(i=ch.length-1;i>=0;i--)if(child0==ch[i]){
			ch=ch[Math.max(0,i-(offset0||0))];
			if(ch)for(var i=0,l=new0.length;i<l;i++)p.insertBefore(new0[i],ch);
			break;
		}
	},
	insertNext:function(child0,new0,offset0){
		offset0=(offset0||0)+1;
		var i,p=child0.parentNode,ch=p.children;
		for(i=ch.length-1;i>=0;i--)if(child0==ch[i]){
			ch=ch[i+offset0];
			if(ch)for(var i=0,l=new0.length;i<l;i++)p.insertBefore(new0[i],ch);
			else for(var i=0,l=new0.length;i<l;i++)p.appendChild(new0[i]);
			break;
		}
	}
})