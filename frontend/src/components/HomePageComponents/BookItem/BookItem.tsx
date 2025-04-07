import { Card, CardBody, CardTitle } from "reactstrap";
import { BookFromListRespose } from "@/models";
import { NO_IMAGE_IMAGE_URL } from "@/constants";
import { useNavigate } from "react-router-dom";

type BookItemProps = {
  book: BookFromListRespose
}

function BookItem({ book }: BookItemProps) {
  const navigate = useNavigate()

  function navigateHandler() {
    navigate(`/book/${book.id}`)
  }
  
  return (
    <>
      <Card 
        color="dark" 
        style={{ width: '15rem', color: "#fff", cursor: "pointer" }}
        onClick={navigateHandler}
      >
        <CardBody className="d-flex flex-column justify-content-center align-items-center">
              <div style={{
                width: "210px",
                height: "280px",
              }}>
                {book.image ?
                  <img 
                    style={{
                      width: "100%",
                      height: "100%",
                    }} 
                    alt="book_image" 
                    src={book.image}
                  /> :
                  <img 
                    style={{
                      width: "100%",
                      height: "100%", 
                    }} 
                    alt="book_image" 
                    src={NO_IMAGE_IMAGE_URL}
                  />
                }
              </div>
          <CardTitle className="mt-3">
            { book.name }
          </CardTitle>
        </CardBody>
      </Card>
    </>
  )
}

export default BookItem