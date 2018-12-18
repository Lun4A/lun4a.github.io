mod.lay_app=(function mod_lay_app(r){
	var m=mod.dom,fx_node,fx={
		charm:function(n,b){
			if(b){
				var a;
				if(m.rmv(n+" .exten:not("+b+")","on","swap")){
					a=m.rot(b,"swap on");
					m.rmv(n,"swap");
				}else{
					m.rmv(b,"swap");
					a=m.rot(b,"on");
				}
				onclick=a?function(e){
					for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--)
					if(/mod-charm/.exec(p.className))return;
					fx.charm(n,b);
				}:null;
			}else{
				m.rot(fx_node,"on");
				m.rot(n,"on");
				m.rmv(n,"ex");
				m.rmv(n+" .exten","on");
			}
		},
		charm_ex:function(n){m.rot(n,"ex")}
	};
	r.fx=fx;
	addEventListener("click",function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			switch(p.constructor){
			case HTMLButtonElement:fx0(p);break;
			}
		}
	});
	function fx0(p){fx_node=p;
		var n=p.name.split(";"),u,v,i=0,l=n.length;
		for(;i<l;i++)if(v=n[i].split("\t"),u=v.shift(),fx[u])fx[u].apply(m,v);
	}
	return r;
})({
	
})