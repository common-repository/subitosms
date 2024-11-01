
jQuery(document).ready( function($) {

	if ( $('#submitdiv').length ) {
		stamp = $('#timestamp').html();

		function updateText() {

			if ( ! $('#timestampdiv').length )
				return true;

			var attemptedDate, originalDate, currentDate, publishOn, aa = $('#aa').val(),
				mm = $('#mm').val(), jj = $('#jj').val(), hh = $('#hh').val(), mn = $('#mn').val();

			attemptedDate = new Date( aa, mm - 1, jj, hh, mn );
			originalDate = new Date( $('#hidden_aa').val(), $('#hidden_mm').val() -1, $('#hidden_jj').val(), $('#hidden_hh').val(), $('#hidden_mn').val() );
			currentDate = new Date( $('#cur_aa').val(), $('#cur_mm').val() -1, $('#cur_jj').val(), $('#cur_hh').val(), $('#cur_mn').val() );

			if ( attemptedDate.getFullYear() != aa || (1 + attemptedDate.getMonth()) != mm || attemptedDate.getDate() != jj || attemptedDate.getMinutes() != mn ) {
				$('.timestamp-wrap', '#timestampdiv').addClass('form-invalid');
				return false;
			} else {
				$('.timestamp-wrap', '#timestampdiv').removeClass('form-invalid');
			}

			if ( originalDate.toUTCString() == attemptedDate.toUTCString() ) { //hack
				$('#timestamp').html(stamp);
			} else {

				if ( attemptedDate > currentDate  ) {
					publishOn = subitosmsL10n.publishOnFuture;
				} else {
					$('.timestamp-wrap', '#timestampdiv').addClass('form-invalid');
					return false;
				}


				$('#timestamp').html(
					publishOn + ' <b>' +
					subitosmsL10n.dateFormat.replace( '%1$s', $('option[value="' + $('#mm').val() + '"]', '#mm').text() )
						.replace( '%2$s', jj )
						.replace( '%3$s', aa )
						.replace( '%4$s', hh )
						.replace( '%5$s', mn )
					+ '</b> '
				);
			}
			return true;
		}

		$('#timestampdiv').siblings('a.edit-timestamp').click(function() {
			if ($('#timestampdiv').is(":hidden")) {
				$('#timestampdiv').slideDown('fast');
				$('#mm').focus();
				$(this).hide();
			}
			return false;
		});

		$('.cancel-timestamp', '#timestampdiv').click(function() {
			$('#timestampdiv').slideUp('fast');
			$('#mm').val($('#hidden_mm').val());
			$('#jj').val($('#hidden_jj').val());
			$('#aa').val($('#hidden_aa').val());
			$('#hh').val($('#hidden_hh').val());
			$('#mn').val($('#hidden_mn').val());
			$('#timestampdiv').siblings('a.edit-timestamp').show();
			updateText();
			return false;
		});

		$('.save-timestamp', '#timestampdiv').click(function () { // crazyhorse - multiple ok cancels
			if ( updateText() ) {
				$('#timestampdiv').slideUp('fast');
				$('#timestampdiv').siblings('a.edit-timestamp').show();
			}
			return false;
		});
		
		$('#sms_message').change( function() { 
			$(this).closest('tr').removeClass( 'form-invalid' ); 
		} );

		$('#sendsms_form').on( 'submit', function(e){
			if ( ! updateText() ) {
				e.preventDefault();
				$('#timestampdiv').show();
				return false;
			}
			
			var sms_message=$('#sms_message').val();
			if (sms_message.length==0 || sms_message.length>160){
				$('#sms_message').closest('tr').addClass('form-invalid');
				e.preventDefault();
				return false;
			}
			$('#submit_sendsms').attr('disabled','disabled');
		});
	}
});