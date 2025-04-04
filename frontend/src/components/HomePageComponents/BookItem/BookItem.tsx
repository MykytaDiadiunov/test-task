import { Card, CardBody, CardTitle } from "reactstrap";
import { BookFromListRespose } from "../../../models";

type BookItemProps = {
  book: BookFromListRespose
}

function BookItem({ book }: BookItemProps) {
  return (
    <Card
      style={{
        width: '18rem'
      }}
    >
      <img  alt="book_image" src={book.image}/>
      <CardBody>
        <CardTitle>
          Card title
        </CardTitle>
      </CardBody>
    </Card>
  )
}

export default BookItem