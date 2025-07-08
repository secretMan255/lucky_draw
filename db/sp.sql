USE `luckyDraw`;

DELIMITER $$
DROP PROCEDURE IF EXISTS `luckyDraw`.`sp_assign_winner` $$ 
CREATE PROCEDURE sp_assign_winner(IN p_gift_id INT, IN p_user_id INT)
BEGIN
  DECLARE current_winner INT;

  SELECT winner_id INTO current_winner
  FROM gifts
  WHERE id = p_gift_id
  FOR UPDATE;

  IF current_winner IS NULL THEN
    UPDATE gifts SET winner_id = p_user_id WHERE id = p_gift_id;
  END IF;
END $$
DELIMITER ;