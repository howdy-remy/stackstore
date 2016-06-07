//items: [{productId: 1, price: 10.00, quantity: 2}, {productId: 2, price: 20.00, quantity: 1}]


app.controller('TrolleyCtrl', function($scope){
	$scope.trolley = { 
		0: {title: 'Decoy Detonator',
			description: "Need to create a diversion to sneak past some Ministry employees? Then here's just the thing! You can twist the key at the top to set it up. Rolling action is friction activated. You just pull it back, release and off it goes.",
			price: 34.99,
			quantity: 10,
			category: ['general, defense'],
			photoUrl: 'http://i.imgur.com/1EoJoj2.jpg'}, 
		1: {title: 'Puking Pastilles',
			description: "Help skive off classes with our Puking Pastilles! They make the eater vomit within seconds of eating it. Part of our Skiving Snackbox line.",
			price: 34.99,
			quantity: 10,
			category: ['edibles'],
			photoUrl: 'http://i.imgur.com/WJMibuA.jpg'}
	};
});