describe('Testing the functionality, this is the checklist', ()=>{
    it('should return an empty object', ()=>{
        const done = getAPIData();
        expect(Object.keys(done).length).toBe(0);
    })

  })