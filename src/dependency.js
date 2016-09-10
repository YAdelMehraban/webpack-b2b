const MyClass = class Me {
  getClassName() {
    return Me.name;
  }

  getTemplate() {
    return `
    <div class="row">
      <div class="col-xs-6">
        <label>Name:</label>
        <input class="form-control" type="text" />
      </div>
    </div>`;
  }
};

export default MyClass;

console.log('dependency loaded');