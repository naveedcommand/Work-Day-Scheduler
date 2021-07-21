var today = moment();		
		var currentDate = moment().format('Do-MM-YYYY');		
		var startHour = 8;
		var totalWorkingHour = 9;
			
		$(document).ready(function(){
			
			$("#currentDay").html (moment().format('dddd, MMMM Do'));
			
			displayHourlyBox();
			
			displayText();
		});
		
		function saveText(button)
		{
			
			var id = button.id;
			
			var txtID =  id.replace('a_','');
			
			var storageName = currentDate + "_" + id;
			
			localStorage.removeItem(storageName);
			
			localStorage.setItem(storageName, $("#txt_" + txtID).val());
		}
		
		function displayText(){
			
				
				for(index = startHour; index <= startHour + totalWorkingHour; index++)
				{
					var storageName = currentDate + "_a_" + index;
					//console.log(storageName);
					$("#txt_" + index).val( localStorage.getItem(storageName));
				}
			
		}
		
		function displayHourlyBox(){
		
			var htmlBox = "";		
			
			var startTime = today.set({h: startHour, m: 0});
			
			var setFormatSingleDigit ="hA";
			var setFormatDoubleDigit = "hhA";
			var setFormat = "";
			var endHour = startHour + totalWorkingHour;
			var currentHour = 0;
			var pastPresentFutureClassName = "Present";
			var disabled = "";
			var tempStartHour = startHour;
			
			for(var i = startHour; i <= endHour;i++){		
								
				currentHour = moment().get('hour');
								
				if(startHour < 10 || startHour > 12){
					setFormat = setFormatSingleDigit;
				}	
				else{
					setFormat = setFormatDoubleDigit;
				}
				<!-- console.log(startHour); -->
				<!-- console.log(currentHour); -->
				
				if(startHour < currentHour){
				
					pastPresentFutureClassName = "past";
					//disabled = "disabled";
				}
				else if(startHour == currentHour){
				
					pastPresentFutureClassName = "present";		
					disabled = "";
				}
				else{
					pastPresentFutureClassName = "future";	
					disabled = "";
				}
				
					htmlBox += " <div class='row margin_bottom'> " + 
							   " <div class='col-1 col-1-cus pr-0'> " + 
										" <div class='time_div'> " + startTime.format(setFormat) + "</div> " +
							   "</div>" + 
							   "<div class='col-10 col-10-cus px-0 detail_input_div'> " +
									" <textarea class='form-control border_radius " + pastPresentFutureClassName + "'" + disabled + " id='txt_" + startHour + "' rows='2'></textarea> " +
							   " </div> " +
							   " <div class='col-1 col-1-cus pl-0 '><a href='#' id='a_" +  startHour + "' onclick='saveText(this);' class='saveBtn'><i class='fas fa-save'></i></a></div> " +
							   " </div>";
				
				
				
				$("#Timeblocks").html(htmlBox);
				
				startHour +=1;
				startTime = today.set({h: startHour, m: 0});
				if(startHour > 23 ) break;
			}
			
			startHour = tempStartHour;
		}