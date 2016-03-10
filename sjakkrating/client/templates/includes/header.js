Template.header.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
    },

	format_date: function() {
		var date = UPDATED;

		months = {
			1: "januar",
			2: "februar",
			3: "mars",
			4: "april",
			5: "mai",
			6: "juni",
			7: "juli",
			8: "august",
			9: "september",
			10: "oktober",
			11: "november",
			12: "desember",
		};

		var list = date.split("/");
		var day = parseInt(list[0], 10).toString();
		var month = months[parseInt(list[1], 10)]
		var year = "20" + list[2];

		return day + ". " + month + " " + year;
	},

});
