import { Card, CardBody, CardTitle } from "reactstrap";
import { BookFromListRespose } from "@/models";
import { useEffect } from "react";

type BookItemProps = {
  book: BookFromListRespose
}

function BookItem({ book }: BookItemProps) {
  useEffect(() => {

  }, [])

  return (
    <>
      <Card color="dark" style={{ width: '15rem', color: "#fff" }}>
        <CardBody className="d-flex flex-column justify-content-center align-items-center">
            {book.image && 
              <div style={{
                width: "210px",
                height: "280px",
              }}>
                <img 
                  style={{
                    width: "100%",
                    height: "100%",
                  }} 
                  alt="book_image" 
                  src={book.image}
                />
              </div>
            }
            {!book.image && 
              <div style={{
                width: "210px",
                height: "280px",
              }}>
                <img 
                  style={{
                    width: "100%",
                    height: "100%", 
                  }} 
                  alt="book_image" 
                  src="https://www.freeiconspng.com/uploads/no-image-icon-6.png"
                />
              </div>
            }
          <CardTitle className="mt-3">
            { book.name }
          </CardTitle>
        </CardBody>
      </Card>
    </>
  )
}

export default BookItem