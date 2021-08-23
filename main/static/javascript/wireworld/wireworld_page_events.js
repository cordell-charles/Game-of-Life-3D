
function gamePageEvents()
{
	//TODO: manage allow for bindings to be removed dynamically 
	
	var myself = this;
	
	this.RegisterEvent = function(_hook,_event)
	{
		if(myself.isFunction(_event))
		{
			console.log("Registering " + _hook);
			var hook;
			switch(_hook.toLowerCase())
			{
				case "onload":
					var tgt;
					if(document.onload)
					{
						console.log("using document");
						tgt = document;
					}
					else
					{
						console.log("using window");
						tgt = window;
					}
						
				    if(myself.isFunction(tgt.onload))
					{
						console.log("Adding event to que for " + _hook);
						var oldHook = tgt.onload;
						tgt.onload = function()
						{
							oldHook();
							_event();
						}
					}
					else
					{
						tgt.onload = _event;
					}
					
				break;
				case "onresize":
					if(myself.isFunction(document.body.onresize))
					{
						console.log("Adding event to que for " + _hook);
						var oldHook = document.body.onresize;
						document.body.onresize = function()
						{
							oldHook();
							_event();
						}
					}
					else
					{
						document.body.onresize = _event;
					}
				break;
				case "onpageshow":
					if(myself.isFunction(document.body.onpageshow))
					{
						console.log("Adding event to que for " + _hook);
						var oldHook = document.body.onpageshow;
						document.body.onpageshow = function()
						{
							oldHook();
							_event();
						}
					}
					else
					{
						document.body.onpageshow = _event;
					}
				break;
				case "onscroll":
					if(myself.isFunction(window.onscroll))
					{
						console.log("Adding event to que for " + _hook);
						var oldHook = window.onscroll;
						window.onscroll = function()
						{
							oldHook();
							_event();
						}
					}
					else
					{
						window.onscroll = _event;
					}
				break;
				default:
					alert("Hook \"" + _hook + "\" is not supported!");
				break;
			}
			
		}
		else
		{
			alert("Event for hook " + _hook + " is not a function");
		}
	}
	
	this.isFunction = function(_obj)
	{
		return typeof(_obj) === 'function';
	}
	
	return this;
}

pageEvents = gamePageEvents();
