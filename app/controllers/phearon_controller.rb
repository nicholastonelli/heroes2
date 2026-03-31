class PhearonController < ApplicationController
  #before_action :set_charactersheet, only: %i[ show edit update destroy ]
  def index
    @characters = Character.all
    @phearon = Character.find_by(name: "Phearon")
    @items = Item.all
    
  end

  def get

  end
end