import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import iconDelete from "../resources/icon-delete.png";

const HeaderWrapper = styled.div`
  padding: 10px 20px 0;
  font-size: 24px;
  line-height: 50px;
  font-weight: bold;
  color: #fff;
`;

const TrashCan = styled.div<{$isDraggingOver: boolean}>`
  position: fixed;
  top: 10px;
  right: 20px;
  width: 50px;
  height: 50px;
  margin-left: auto;
  border-radius: 25px;
  background: url(${iconDelete}) no-repeat center / 20px auto;
  background-color: ${(props) => props.$isDraggingOver ? "rgba(255, 255, 255, .3)" : "transparent" };
  transition: background-color .3s ease;
`;

function Header() {
  return (
    <HeaderWrapper>
      <h1>Crello</h1>
      <Droppable droppableId="trash">
        {(provided, snapshot) => (
          <TrashCan
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {provided.placeholder}
          </TrashCan>
        )}
      </Droppable>
    </HeaderWrapper>
  )
}

export default Header;