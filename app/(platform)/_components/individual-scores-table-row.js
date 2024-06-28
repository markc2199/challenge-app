

export default function IndividualScoresTableRow({ score, submitted_at, number }) {

    const date = new Date(submitted_at)
    const formattedDate = date.toLocaleDateString();
    
    return (
       
      <tr>
        <th>{number}</th>
        <td>{formattedDate}</td>
        <td>{score}</td>
      </tr>
   
    );
}