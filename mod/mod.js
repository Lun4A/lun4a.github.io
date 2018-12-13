try{mod}catch(e){
	eval("function mod(){return this.load.apply(this,arguments)}");
	if(!$)var $=mod;
	mod.EndDOM=function(a){document.addEventListener("DOMContentLoaded",a)};
	mod.load=function(){
		var args=[],option;
		Array.prototype.push.apply(args,arguments);
		option=args.pop()||{};
		if(option.key){
			
		}else{
			
		}

		console.log(args);
	};
	mod.load.prototype=Array.prototype;
}