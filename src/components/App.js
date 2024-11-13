import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import {api} from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";
import NewCard from "./NewCard";
import ConfirmDelete from "./ConfirmDelete";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);


  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [cardToDelete, setCardToDelete] = useState(null);
 
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  
  function handleDeletePopupClick(card) {
    setCardToDelete(card); 
    setIsDeletePopupOpen(true); 
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const closeAllPopups = () =>{
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
  }

  useEffect (() => {
    api.getUserInfo().then((ApiUserInfo) => {
      setCurrentUser(ApiUserInfo)
    })
    .catch((err) => {
      console.log("Erro ao carregar dados do usuário: ", err);
    });
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .updateUserProfile(name, about)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error("Erro ao atualizar o perfil: ${err}"); 
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Erro ao atualizar o avatar: ${err}`); // Se há um erro, será exibido no console;
      });
  }

  function handleNewCardSubmit({ link, name }) {
    api
      .createCard(link, name)
      .then((newCard) => {
        setCards([newCard, ...cards]); // Atualiza o novo card
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Erro ao adicionar um novo card ${err}`); // Se há um erro, será exibido no console;
      });
  }

  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log("Erro ao carregar os cartões: ", err);
      });
  }, []);


  async function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    await api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard
        ));
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((prevCards) => prevCards.filter((currentCard) => currentCard._id !== card._id));
    } catch (err) {
      console.log("Erro ao deletar o cartão:", err);
    }
  }

  function handleCardDelete(card) {
    if (!cardToDelete) {
      return;
    }

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
       
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => console.error(`Erro ao eliminar o cartao: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
     <div className="page">
      
      <Header />
      <Main
       onEditProfileClick={handleEditProfileClick}
       onAddPlaceClick={handleAddPlaceClick}
       onEditAvatarClick={handleEditAvatarClick}
       cards={cards}
       onCardClick={handleCardClick}
       onCardDelete={handleDeletePopupClick} 
       onCardLike={handleCardLike}
       />

      <ImagePopup 
      card={selectedCard}  
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}  
      />

      <EditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        />

      <EditAvatar
       isOpen={isEditAvatarPopupOpen}
       onClose={closeAllPopups}
       onUpdateAvatar={handleUpdateAvatar}/>

       <NewCard
       isOpen={isAddPlacePopupOpen}
       onClose={closeAllPopups}
       onAddPlaceSubmit={handleNewCardSubmit}/>
      
       <ConfirmDelete
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onConfirmDelete={handleCardDelete}/>
    
      <Footer />
     </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
