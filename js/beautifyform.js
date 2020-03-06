jQuery.fn.customInput = function(){
	return $(this).each(function(){	
		if($(this).is('[type=checkbox],[type=radio]')){
			var input = $(this);
			
			// 使用输入的ID得到相关的标签
			var label = $('label[for='+input.attr('id')+']');
			
			// 包裹在一个div输入+标签
			input.add(label).wrapAll('<div class="custom_'+ input.attr('type') +'"></div>');
			
			if(input.attr('disabled')){
				if(input.is(':checked')){
					label.addClass('c_ck_disabled')
				}else{
					label.addClass('c_disabled')
				}
			}else{
				//alert(11)
				// 必要的浏览器不支持：hover伪类的标签
				/*label.hover(
					function(){ $(this).addClass('hover'); },
					function(){ $(this).removeClass('hover'); }
				);暂时不要*/
				
				//绑定自定义事件，触发它，绑定点击，焦点，模糊事件				
				input.bind('updateState', function(){	
					input.is(':checked') ? label.addClass('checked') : label.removeClass('checked checkedHover checkedFocus'); 
				})
				.trigger('updateState')
				.click(function(){ 
					$('input[name='+ $(this).attr('name') +']').trigger('updateState'); 
				})
				/*.focus(function(){ 
					label.addClass('focus'); 
					if(input.is(':checked')){  $(this).addClass('checkedFocus'); } 
				})
				.blur(function(){ label.removeClass('focus checkedFocus'); });*/
			}
			
			
			
			
		}
	});
};