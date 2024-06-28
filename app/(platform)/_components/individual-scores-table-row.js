

export default function IndividualScoresTableRow({ score, submitted_at, number }) {
    return (
       
      <tr>
        <th>{number}</th>
        <td>{submitted_at}</td>
        <td>{score}</td>
      </tr>
   
    );
}