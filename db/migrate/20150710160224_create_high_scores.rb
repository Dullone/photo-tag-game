class CreateHighScores < ActiveRecord::Migration
  def change
    create_table :high_scores do |t|
      t.references :game_photo, index: true, foreign_key: true
      t.string :name
      t.integer :score

      t.timestamps null: false
    end
  end
end
