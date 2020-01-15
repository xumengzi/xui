/*
	promise.js主要是自我提升写的mini版本的promise
*/
class Xpromise {
  constructor(callback) {
    this.resolve = undefined;
    this.error = undefined;
    this.status = 'pending';

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (val) => {
      if (this.status === 'pending') {
        this.status = 'resolved';
        this.resolve = val;
        this.onResolvedCallbacks.forEach(fn => {
          this.isFunction(fn) && fn();
        });
      };
    };

    const reject = (err) => {
      if (this.status === 'reject') {
        this.status = 'rejected';
        this.error = err;
        this.onRejectedCallbacks.forEach(fn => {
          this.isFunction(fn) && fn();
        });
      };
    };

    this.isFunction(callback) && callback(resolve);
  }
  isFunction(fn) {
    return typeof fn === 'function';
  }
  then(onfulfilled, onrejected) {
    if (this.status === 'resolved') {
      this.isFunction(onfulfilled) && onfulfilled(this.resolve);
    };
    if (this.status === 'rejected') {
      this.isFunction(onrejected) && onrejected(this.error);
    };
    if (this.status === 'pending') {
      this.onResolvedCallbacks.push(() => {
        onfulfilled(this.resolve);
      });

      this.onRejectedCallbacks.push(() => {
        onrejected(this.error);
      });

    };
  }
};

const promise = new Xpromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});
promise.then(resolve => {
  console.log(resolve);
}, err => {
  console.log(err);
});