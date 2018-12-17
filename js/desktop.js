function desktop(frame,main,cb_new){
	var new_meta={name:"main",node:main};
	//var request = indexedDB.open("desktop",2);
	this.frame=frame;
	this.current=new_meta;
	this.cb_new=cb_new;
	this.list={main:new_meta};
	this.increment=0;
}
desktop.prototype.new=function(meta,src){
	var id="app"+(++this.increment),i=src.indexOf("/script>"),
	f=new Function("app0",src.substr(8,i-9)),
	c=document.createElement("div");
	c.innerHTML=src.substr(i-1).replace(/\bapp-index/g,id);
	c.className+=" "+id;
	f(c);

	meta.node=c;

	return meta;
};
desktop.prototype.load=function(name,meta){
	if(!this.show(name)){
		if(!meta.name)meta.name=name;
		var t=this,url=meta.url_main;
		t.cb_new(url,function(){
			t.list[name]=t.new(meta,this.responseText);
			if(!meta.style)t.show(name);
		});
	}
};
desktop.prototype.show=function(name){
	if(name in this.list){
		if(this.current!=this.list[name]){
			this.frame.textContent="";
			this.frame.appendChild(this.list[name].node);
			this.current=this.list[name];
		}
		return 1;
	}
};