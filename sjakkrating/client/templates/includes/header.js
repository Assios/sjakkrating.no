Template.header.helpers({
    activeIfTemplateIs: function (template) {
      const currentRoute = Router.current();
      return currentRoute && template === currentRoute.lookupTemplate() ? 'active' : '';
    },

	random_piece: function() {
    	const pieces = ["king", "queen", "knight", "bishop", "pawn"];

		return pieces[Math.floor(Math.random() * pieces.length)];
	},

	format_date: function() {
		const months = {
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

		const list = UPDATED.split("/");
		const day = parseInt(list[0], 10).toString();
		const month = months[parseInt(list[1], 10)]
		const year = "20" + list[2];

		return day + ". " + month + " " + year;
	},

});
