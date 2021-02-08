function imgName(image) {
	if(jQuery(image).next().text() == "/"){
		if(jQuery(image).text().indexOf("aug") != -1){
			return jQuery(image).text();
		}
		
		return jQuery(image).text() + "/" + jQuery(image).next().next().text();
	}
	else if(jQuery(image).prev().text() == "/"){
		if(jQuery(image).prev().prev().text().indexOf("aug") != -1){
			return jQuery(image).prev().prev().text();
		}
		
		return jQuery(image).prev().prev().text() + "/" + jQuery(image).text();
	}
	
	return jQuery(image).text();
}

function changeGuitarChordVariation(){
	jQuery("#spanVariation").html(jtab.Variation);
	jQuery(".jtab").html(jtab.Chord + ":" + jtab.Variation);
	jtab.render(jQuery(".jtab"));
}

function openChordTooltip(){
		if(jtab.IsValidChord == true){
			jtab.render(jQuery(".jtab"));
			
			jQuery("#btnNext").click(function(){
				if(jtab.Chord.indexOf("/") == -1){
					if(jtab.Variation != 10){
						jtab.Variation++;
						changeGuitarChordVariation();
					}
				}
			});
			
			jQuery("#btnPrevious").click(function(){
				if(jtab.Variation != 1){
					jtab.Variation--;
					changeGuitarChordVariation();
				}
			});
		}
	}

jQuery("pre").transpose();

jQuery(".c").attr("title","").tooltip({
	position: {
		my: "center bottom", 
		at: "center top", 
	},
	show: {
		duration: 0
	},
	content: function(){
		if(jQuery("#ddlChord").val() == "Piano"){
			if(piano.Chords[(imgName(this)).replace(/#/g,"s")] == undefined){
				piano.IsValidChord = false;
				
				return jQuery("<div>No data</div>");
			}
			else{
				piano.IsValidChord = true;
				piano.Chord = imgName(this);
				return jQuery("<div><center><div id='divVariation'><b>" + piano.Chord + "</b></div></center></div>" + piano.generatePiano());
			}
		}
		else{
			if(jtab.Chords[imgName(this)] == undefined){
				jtab.IsValidChord= false;
				
				return jQuery("<div>No data</div>");
			}
			else{
				jtab.IsValidChord= true;
				jtab.Variation = 1;
				jtab.Chord = imgName(this);
				return jQuery("<div><center><span class='c-variasi'>Variasi <span id='spanVariation'>" + jtab.Variation + "</span></span></center></div><div class='jtab chordonly'>" + jtab.Chord + ":" + jtab.Variation + "</div><div><button id='btnNext'>Next</button></div><div id='divPrevious'><button id='btnPrevious'>Previous</button></div>");
			}
		}
	},
	open: function(event, ui)
    	{
       		if (typeof(event.originalEvent) === 'undefined')
        	{
            		return false;
        	}

        	var $id = jQuery(ui.tooltip).attr('id');

        	jQuery('div.ui-tooltip').not('#' + $id).remove();
		
		openChordTooltip();
    	},
    	close: function(event, ui)
    	{
       		ui.tooltip.hover(function()
        	{
            		jQuery(this).stop(true).fadeTo(100, 1); 
        	},
        	function()
        	{
            		jQuery(this).fadeOut('100', function()
            		{
               			jQuery(this).remove();
            		});
        	});
    	},
});

jQuery(".on").attr("title","").tooltip({
	position: {
	    my: "center bottom", 
	    at: "center top", 
	},
	content: function(){
		var Chord = jQuery(this).prev().text() + "/" + jQuery(this).next().text();
		/* var Chord = piano.Chords[jQuery(this).prev().text()]; */
		
		if(jQuery("#ddlChord").val() == "Piano"){
			if(piano.Chords[(Chord).replace(/#/g,"s")] == undefined){
				piano.IsValidChord = false;
				
				return jQuery("<div>No data</div>");
			}
			else{
				piano.IsValidChord = true
				piano.Chord = Chord;
				return jQuery("<div><center><div id='divVariation'><b>" + piano.Chord + "</b></div></center></div>" + piano.generatePiano());
			}
		}
		else{
			if(jtab.Chords[(jQuery(this).prev().text().indexOf("aug") != -1 ? jQuery(this).prev().text() : jQuery(this).prev().text() + "/" + jQuery(this).next().text())] == undefined){
				jtab.IsValidChord= false;
				
				return jQuery("<div>No data</div>");
			}
			else{
				jtab.IsValidChord= true;
				jtab.Variation = 1;
				jtab.Chord = (jQuery(this).prev().text().indexOf("aug") != -1 ? jQuery(this).prev().text() : jQuery(this).prev().text() + "/" + jQuery(this).next().text());
				return jQuery("<div><center><span class='c-variasi'>Variasi <span id='spanVariation'>" + jtab.Variation + "</span></span></center></div><div class='jtab chordonly'>" + jtab.Chord + ":" + jtab.Variation + "</div><div><button id='btnNext'>Next</button></div><div id='divPrevious'><button id='btnPrevious'>Previous</button></div>");
			}
		}
		
	},
	open: function(event, ui)
    	{
       		if (typeof(event.originalEvent) === 'undefined')
        	{
            		return false;
        	}

        	var $id = jQuery(ui.tooltip).attr('id');

        	jQuery('div.ui-tooltip').not('#' + $id).remove();
		
		openChordTooltip();
    	},
    	close: function(event, ui)
    	{
       		ui.tooltip.hover(function()
        	{
            		jQuery(this).stop(true).fadeTo(100, 1); 
        	},
        	function()
        	{
            		jQuery(this).fadeOut('100', function()
            		{
               			jQuery(this).remove();
            		});
        	});
    	},
});

jQuery("pre span:first").css('font-weight', 'bold');
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Intro") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Verse") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Chorus") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Reff") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Bridge") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Interlude") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Ending") >= 0 }).addClass('vc')
jQuery("span").filter(function() { return jQuery(this).text().indexOf("Rap") >= 0 }).addClass('vc')
