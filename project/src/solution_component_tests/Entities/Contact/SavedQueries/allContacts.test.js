const xml2js = require("xml2js");
const fs = require("fs");

test('Expect System View "All Contacts" to have emailaddress1', () => {
  const xml = fs.readFileSync(
    "solution_components/Entities/Contact/SavedQueries/{0d5d377b-5e7c-47b5-bab1-a5cb8b4ac105}.xml",
    {
      encoding: "UTF-8",
    }
  );

  return xml2js.parseStringPromise(xml).then((result) => {
    const emailAddress1 = result.savedqueries.savedquery[0].layoutxml[0].grid[0].row[0].cell.filter(c=>c.$.name === 'emailaddress1')
    expect(emailAddress1).toBeTruthy();
  });
});