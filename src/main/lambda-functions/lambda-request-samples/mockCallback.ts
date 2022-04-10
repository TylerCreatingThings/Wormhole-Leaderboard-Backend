export const getStubbedCallback = 
    jest.fn().mockImplementation((errorMsg) => {
        if (errorMsg) throw new Error(errorMsg);
      });