var counterList = {}

$(function(){

	$(".counter").each(function(){
		var $counter = $(this)
		var top = $counter.offset().top

		if(counterList[top] == undefined){
			counterList[top] = [$counter]
		} else {
			counterList[top].push($counter)
		}
	})

	$(window).on("scroll",function(){
		refreshScroll()
	})

	refreshScroll()

})

function animateCounter($counter){
	$counter.prop("data-counter",0)
			.animate({
					"data-counter": $counter.text()
				},{
					duration: 5000,
					easing: "swing",
					step: function(now){
						$counter.text(Math.round(now))
					}
				})
}

function refreshScroll(){
	var scrollPos = $(window).scrollTop() + $(window).innerHeight();

		Object.keys(counterList).forEach(function(key){
			if(counterList[key] != undefined && 
				key < scrollPos){

				counterList[key].forEach(function($counter){
					animateCounter($counter)
				})
				counterList[key] = undefined

			}
		})
}