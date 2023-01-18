import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function DashLogItem(activeName, thingy) {
  console.log(thingy);
  console.log(activeName);
  return (
    <tr>
      <td className="col-8 p-1">
        <p className="m-2 d-flex">name</p>
      </td>
      <td className="col-4">cal: 4000</td>

      <td className="col-2 d-none d-lg-table-cell">
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{ height: "20px" }}
          className="mt-1"
        />
      </td>
    </tr>
  );
}
export default DashLogItem;
