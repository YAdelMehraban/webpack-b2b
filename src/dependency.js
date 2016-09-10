const MyClass = class Me {
  static getClassName() {
    return Me.name;
  }

  static getTemplate() {
    return `
    <div class="row">
      <div class="col-xs-6">
        <label>Name:</label>
        <input class="form-control" type="text" />
      </div>
      <div class="col-xs-12 link">
        <a href="#"><h2>Me</h2></a>
      <div>
    </div>`;
  }
};

export default MyClass;

console.log('dependency loaded');
