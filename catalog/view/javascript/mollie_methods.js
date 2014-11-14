if (!window.mollie_method_add)
{
	(function ($)
	{
		window.mollie_method_add = function (id, description, image)
		{
			if (!window.mollie_methods)
			{
				window.mollie_methods = [];
			}

			for (var i = 0; i < window.mollie_methods.length; i++)
			{
				if (window.mollie_methods[i].id == id)
				{
					return window.mollie_methods;
				}
			}

			window.mollie_methods.push({ id: id, description: description, image: image });

			return window.mollie_methods;
		};

		window.mollie_issuer_add = function (method_id, id, name)
		{
			if (!window.mollie_issuers)
			{
				window.mollie_issuers = [];
			}

			for (var i = 0; i < window.mollie_methods.length; i++)
			{
				if (window.mollie_methods[i].id == method_id)
				{
					if (!window.mollie_issuers[i])
					{
						window.mollie_issuers[i] = [];
					}

					for (var j = 0; j < window.mollie_issuers[i].length; j++)
					{
						if (window.mollie_issuers[i][j].id == id)
						{
							return window.mollie_issuers[i];
						}
					}

					window.mollie_issuers[i].push({ id: id, name: name });

					return window.mollie_issuers[i];
				}
			}

			return [];
		};

		window.mollie_methods_append = function (method_report_url, issuer_report_url, issuer_text, methods)
		{
			var mollie        = $('input[name="payment_method"][value="mollie_ideal"]'),
			    is_opencart_2 = (mollie.attr("id") !== "mollie_ideal"),
				html,
				issuers,
				method,
				row,
				m,
				i;

			if (!mollie.length)
			{
				window.console && console.log('Error in mollie_methods_append: Cannot append non-existing method.');
				return false;
			}

			if (typeof methods === "undefined" || !methods.length)
			{
				methods = window.mollie_methods;
			}

			if (!methods.length)
			{
				window.console && console.log('Error in mollie_methods_append: No methods found.');
				return false;
			}

			if (typeof issuer_text === "undefined" || issuer_text == '')
			{
				issuer_text = 'Select your bank:';
			}

			if (is_opencart_2)
			{
				row = mollie.closest("div.radio");
				row.empty();
			}
			else
			{
				row = mollie.closest("tr");
				row.empty();
			}

			for (m = 0; m < methods.length; m++)
			{
				method = methods[m];

				if (method.id && method.description)
				{
					if (is_opencart_2)
					{
						html = '<div class="radio clearfix">' +
							'<label>' +
							'<input id="mpm_' + m + '" type="radio" value="mollie_ideal" name="payment_method" onclick="window.mollie_method_select(\'' + method_report_url + '\', \'' + method.id + '\', \'' + method.description + '\', \'mpm_' + m + '_issuer_row\');" />' +
							'<img src="' + method.image + '" height="24" align="left" style="margin-top:-2px" />' +
							' &nbsp;' + method.description +
							'</label>' +
							'</div>';

						if (window.mollie_issuers && window.mollie_issuers[m] && window.mollie_issuers[m].length)
						{
							issuers = window.mollie_issuers[m];

							html += '<div class="radio mpm_issuer_rows" id="mpm_' + m + '_issuer_row">';

							html += '<select id="mpm_' + m + '_issuer" onchange="mollie_issuer_select(\'' + issuer_report_url + '\', (window.jQuery || window.$)(this).val())">';
							html += '<option value="">' + issuer_text + '</option>';

							for (i = 0; i < issuers.length; i++)
							{
								html += '<option value="' + issuers[i].id + '">' + issuers[i].name + '</option>';
							}

							html += '</select>';

							html += '</div>';
						}
					}
					else
					{
						html = '<tr class="highlight">' +
							'<td>' +
							'<input id="mpm_' + m + '" type="radio" value="mollie_ideal" name="payment_method" onclick="window.mollie_method_select(\'' + method_report_url + '\', \'' + method.id + '\', \'' + method.description + '\', \'mpm_' + m + '_issuer_row\');" />' +
							'</td>' +
							'<td>' +
							'<label for="mpm_' + m + '"><img src="' + method.image + '" height="24" align="left" style="margin-top:-5px" /> &nbsp;' + method.description + '</label>' +
							'</td>' +
							'</tr>';

						if (window.mollie_issuers && window.mollie_issuers[m] && window.mollie_issuers[m].length)
						{
							issuers = window.mollie_issuers[m];

							html += '<tr class="mpm_issuer_rows" id="mpm_' + m + '_issuer_row"><td>&nbsp;</td><td>' +
								'<select id="mpm_' + m + '_issuer" onchange="mollie_issuer_select(\'' + issuer_report_url + '\', (window.jQuery || window.$)(this).val())">' +
								'<option value="">' + issuer_text + '</option>';

							for (i = 0; i < issuers.length; i++)
							{
								html += '<option value="' + issuers[i].id + '">' + issuers[i].name + '</option>';
							}

							html += '</select>' +
								'</td></tr>';
						}
					}

					row.before(html);
				}
			}

			return true;
		};

		window.mollie_method_select = function (report_url, method_id, method_description, issuers_row)
		{
			$.post(report_url, {
				mollie_method_id:          method_id,
				mollie_method_description: method_description
			});

			mollie_display_issuers(issuers_row);
		};

		window.mollie_issuer_select = function (report_url, issuer_id)
		{
			$.post(report_url, {
				mollie_issuer_id: issuer_id
			});
		};

		window.mollie_display_issuers = function (active_issuers_row)
		{
			$('.mpm_issuer_rows').hide();

			if (typeof active_issuers_row !== "undefined" && active_issuers_row !== '')
			{
				$('#' + active_issuers_row).show();
			}
		};

	}) (window.jQuery || window.$);
}
