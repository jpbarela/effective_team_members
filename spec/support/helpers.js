function verifySent(mock, data, resource) {
  expect(mock).toHaveBeenCalledWith({
    [resource]: data.map(item => jasmine.objectContaining(item)),
  });
}

module.exports = {
  verifySent
};