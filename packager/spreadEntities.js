// Spreads out entity attributes into their own json file
const flatMap = require("array.prototype.flatmap");
const fse = require("fs-extra");
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");
const parser = new xml2js.Parser({ async: false });

const folderPath = "solution_components";
const entityPath = "Entities";

flatMap.shim();

fs.existsSync(`${folderPath}/${entityPath}`) &&
  fs.readdirSync(`${folderPath}/${entityPath}`).map((eF) =>
    xml2js.parseString(
      fs.readFileSync(`${folderPath}/${entityPath}/${eF}/Entity.xml`, {
        encoding: "UTF-8",
      }),
      (err, result) => {
        !fs.existsSync(`${folderPath}/${entityPath}/${eF}/Attributes`) &&
          fs.mkdirSync(`${folderPath}/${entityPath}/${eF}/Attributes`);

        result.Entity.EntityInfo.map((eInfo) =>
          eInfo.entity
            .filter(
              (ent) =>
                ent &&
                ent.attributes &&
                ent.attributes[0] &&
                ent.attributes[0].attribute
            )
            .map((ent) =>
              ent.attributes[0].attribute.map((a) => {
                fs.writeFileSync(
                  `${folderPath}/${entityPath}/${eF}/Attributes/${a.LogicalName[0]}.json`,
                  JSON.stringify(a),
                  { encoding: "utf8", flag: "w" }
                );
              })
            )
        );
      }
    )
  );
