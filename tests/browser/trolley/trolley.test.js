describe('Trolley', function () {

    beforeEach(module('FullstackGeneratedApp'));
    var $httpBackend;
    var TrolleyFactory;
		var fakeTrolley;
		var fakeItem;


    beforeEach('Get tools', inject(function (_$httpBackend_, _TrolleyFactory_) {
        $httpBackend = _$httpBackend_;
        TrolleyFactory = _TrolleyFactory_;
        fakeTrolley = [{
        	id: 1,
        	title: 'Test Item',
        	amount: 5
        },
        {
        	id: 2,
        	title: 'Test Item 2',
        	amount: 100
        }];
        fakeItem = {
        	id: 1,
        	title: 'Test Item',
        	amount: 5
        };
        fakeUpdatedItem = {
        	id: 1,
        	title: 'Test Item',
        	amount: 10
        };
    }));

    afterEach(function () {
    	try{
	      $httpBackend.verifyNoOutstandingExpectation(false);
	      $httpBackend.verifyNoOutstandingRequest();
    	} catch (err) {
    		this.test.error(err);
    	}
    });


    describe('Trolley Factory', function(){

    	it('fetches all items in the trolley', function(done){
    		// $httpBackend.flush();

    		$httpBackend.expect('GET','/api/trolley')
    		.respond(200, fakeTrolley);

    		TrolleyFactory.fetchAllItems()
    		.then(function(trolleyItems){
    			expect(trolleyItems).to.deep.equal(fakeTrolley);
    		})
    		.catch(done);

    		$httpBackend.flush();
    		done();
    	});

    	//this makes no sense!!!!  (╯°□°)╯︵ ┻━┻
    	//expect 'post' == unexpected 'get', expect 'get' == unexpected 'post'
    	it('adds items to the trolley', function(done){
    		$httpBackend.expect('POST','/api/trolley', fakeItem)
    		.respond(201, fakeItem);

    		TrolleyFactory.addToCart(fakeItem)
    		.then(function(item){
    			expect(item).to.deep.equal(fakeItem);
    		})
    		.catch(done);
    		
    		$httpBackend.flush();
    		done();
    	});

    	it('updates items in the trolley', function(done){
    		$httpBackend.expect('PUT','/api/trolley', {id: 2, amount:10})
    		.respond(204, {id: 2, amount:10});

    		TrolleyFactory.updateCart({id: 2, amount:10})
    		.catch(done);
    		
    		$httpBackend.flush();
    		done();
    	});

    	it('removes items from the trolley', function(done){
    		$httpBackend.expect('DELETE','/api/trolley/' + fakeItem.id)
    		.respond(204);

    		TrolleyFactory.removeFromCart(fakeItem)
    		.catch(done);
    		
    		$httpBackend.flush();
    		done();
    	});

    });

});
