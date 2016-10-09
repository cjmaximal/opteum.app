<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProposalDeleted implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $proposal;

    /**
     * Create a new event instance.
     *
     * @param $proposal
     */
    public function __construct($proposal)
    {
        $this->proposal = $proposal;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
//        return new PrivateChannel('channel-name');
        return ['proposals'];
    }

    public function broadcastAs()
    {
        return 'ProposalDeleted';
    }
}
