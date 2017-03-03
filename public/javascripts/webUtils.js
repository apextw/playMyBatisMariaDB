//讀取圖片資料與驗證
function checkImage (url){
    var s = document.createElement("IMG");
    s.src = url;
    return s;
}

// 傳入Input欄位ID與要顯示imgID，檢查是否要顯示圖片
function imgBlurHandler(inputUrlId , imgUrlId){
	$(inputUrlId).blur("change paste keyup", function() {
		var url = $(inputUrlId).val();
		if(!isURL($(inputUrlId).val())){
	  		console.log("this url is not right , url = " + url);
	  		$(imgUrlId).hide();
	  		return;
		}
	   	var img = checkImage(url); 
	   	img.onerror = function(){
			console.log("this image url is invalid , url = " + url);
			$(imgUrlId).hide();
			return;
	    }
	    img.onload = function(){
	        console.log("this image url is valid , url = " + url);
	      	$(imgUrlId).attr("src" , $(inputUrlId).val());
	      	$(imgUrlId).show();
	    }
	});
}	
  
  // 確認是否是網址
function isURL(str) {
    var pattern = new RegExp(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i); 
    return pattern.test(str);
}

