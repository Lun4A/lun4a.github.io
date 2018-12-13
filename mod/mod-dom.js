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
	rot:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		var arr2=[],x=arr.length-1,a=arguments;
		for(;x>=0;x--){
			if(arr[x].constructor==String){
				arr2.push.apply(arr2,document.querySelectorAll(arr[x]));
			}else{
				var n=arr[x].className;
				if(a.length==2)a=[a[0],a[1],""];
				for(var i=1,l=a.length;i<l;i++){
					if(a[i]==""){
						arr[x].className=n.replace(/(\s*)$/," "+a[1]).trim();
						break;
					}else if(n.match(a[i])){
						arr[x].className=n.replace(new RegExp("(\s*)"+a[i])," "+a[(i+1)%l||1]).trim();
						break;
					}
				}
			}
		}
		if(arr2.length)a[0]=arr2,this.rot.apply(this,a);
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